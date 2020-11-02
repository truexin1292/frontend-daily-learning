<template>
  <!-- 交易订单 -->
  <div class="order-list left-right-container" v-loading="exportFileloading">
    <div class="left-content">
      <BreadcrumbItem :breadcrumbList="['运营管理','交易管理','交易订单']" :getRefDom="getRefDom" ref="breadcrumbDom"/>

      <filter-picker>
        <filter-panel label="下单时间：">
          <el-date-picker
            v-model="search.date"
            type="daterange"
            :clearable="false"
            range-separator="至"
            start-placeholder="开始日期"
            value-format="yyyy-MM-dd"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </filter-panel>
        <filter-panel label="设备编号：">
          <el-input placeholder="请填写设备编号"
                    style="width: 148px;"
                    class="input-devide"
                    v-model="search.value">
          </el-input>
        </filter-panel>
        <filter-panel label="交易单号/商户单号：">
          <el-input placeholder="请填写交易单号/商户单号"
                    style="width: 180px;"
                    class="input-devide"
                    v-model="search.outTradeNo">
          </el-input>
        </filter-panel>
        <filter-panel label="所属场地：">
          <el-select v-model="search.lyyEquipmentGroupId"
                     style="width: 148px;"
                     placeholder="请选择所属场地">
            <el-option
              label="全部"
              value="">
            </el-option>
            <el-option
              v-for="item in siteList"
              :key="item.group_id"
              :label="item.group_name"
              :value="item.group_id">
              {{ item.group_name }}
              <span class="delete-place-color" v-show="item.isactive === 'N'">已删除</span>
            </el-option>
          </el-select>
        </filter-panel>

        <filter-panel label="客户ID：">
          <el-input placeholder="请填写客户id"
                    style="width: 148px;"
                    class="input-devide"
                    v-model="search.lyyUserId">
          </el-input>
        </filter-panel>

        <filter-panel label="订单状态：">
          <el-select v-model="search.type"
                     style="width: 148px;">
            <el-option label="全部"
                       value=""></el-option>
            <el-option label="待支付"
                       value="Prepare"></el-option>
            <el-option label="已支付"
                       value="Pay"></el-option>
            <el-option label="已退款"
                       value="Refund"></el-option>
          </el-select>
        </filter-panel>
        <filter-panel class="right_filter_panpel">
          <el-button
            type="primary"
            @click="getTableData()">
            搜索
          </el-button>
          <el-button
            type="primary"
            @click="exportExcel">
            导出
          </el-button>
          <el-button
            type="primary"
            @click="clearFilterPicker">
            清空搜索条件
          </el-button>
        </filter-panel>
        <filter-panel class="right_filter_panpel">
          <TimeQuickSelect @changeList="getTableData" @getInitDate="getInitDate"/>
        </filter-panel>
      </filter-picker>

      <v-table :tableData="tableData" :tableOptions="tableOptions" @paginationEvent="paginationEvent">
        <template slot="handle" slot-scope="scope">
          <el-button size="mini" type="text" @click="toOrderDetail(scope.row)">查看</el-button>
          <!--          PC端屏蔽退款功能-->
          <!--          v-if="scope.row.type === 'Pay'-->
          <!--          && +scope.row.businessType !== 61 // 普通售货机 - 账号充值-->
          <!--          && +scope.row.businessType !== 39 // 重感售货机 - icCard充值-->
          <!--          && new Date(scope.row.created).getTime() > todayTimeStamp"-->
          <el-button
            size="mini"
            type="text"
            @click="showRefundModal(scope.row)"
            v-if="false"
          >
            退款
          </el-button>
        </template>
      </v-table>
      <el-dialog
        title="订单退款"
        width="856px"
        class="large-dialog"
        :visible.sync="isShowRefundModal">
        <div class="refund-modal-container">
          <el-row>
            <el-col :span="12">
              <span class="name">用户ID:</span>
              <span class="number">{{refundData.lyyUserId}}</span>
            </el-col>
            <el-col :span="12">
              <span class="name">交易单号:</span>
              <span class="number">{{refundData.wechatTrxid}}</span>
            </el-col>
          </el-row>
          <el-row>
            <p class="title">选择需要退款的商品：</p>
            <el-table ref="multipleTable"
                      :data="refundData.detailList"
                      :header-cell-style="{
              backgroundColor: '#F3F3F3'
            }"
                      border
                      tooltip-effect="dark"
                      style="width: 100%"
                      height="300px"
                      @selection-change="handleSelectionChange">
              <el-table-column type="selection"
                               v-if="!isUsePlatForm"
                               width="55">
              </el-table-column>
              <el-table-column
                prop="goodsName"
                align="center"
                show-overflow-tooltip
                label="商品名称">
              </el-table-column>
              <el-table-column
                prop="price"
                align="center"
                label="单价">
                <template slot-scope="scope">
                  <span v-if="+scope.row.pricingMode === 1">{{scope.row.goodPrice | moneyFilter}}</span>
                  <span v-else>{{scope.row.price/100 | moneyFilter}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="quantity"
                align="center"
                label="数量">
                <template slot-scope="scope">
                  <span v-if="+scope.row.pricingMode === 1">{{ goodsCount(scope.row.quantity)}}</span>
                  <el-input-number
                    v-else
                    v-model="scope.row.quantity"
                    :disabled="isUsePlatForm !== 0"
                    @change="handleChangeQuantity('a')"
                    :min="1"
                    :max="scope.row.maxQuantity"
                    label="请输入内容">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                label="实退金额"
                align="center"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <span v-if="+scope.row.pricingMode === 1">{{(scope.row.amount / 100) | moneyFilter}}元</span>
                  <span v-else>{{(scope.row.amountPrice * scope.row.quantity) | moneyFilter}}元</span>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-row type="flex" :gutter="75">
            <el-col :span="12">
              <p class="tips-1">
                <span class="title">退款金额：</span>
                <span class="amount">{{refundDataAmountAll | moneyFilter}}元</span>
                <span class="refund">最多{{refundData.maxTotalFee | moneyFilter}}元</span>
              </p>
              <p class="tips-2 tips-title">提示：</p>
              <p class="tips-2">1.确认退款后，退款金额会原路返回至客户支付账户</p>
              <p class="tips-2">2.只可进行一次手工退款操作</p>
              <p class="tips-2">3.订单优惠将平摊到每个商品，优惠部分不做退款</p>
            </el-col>
            <el-col :span="12" class="refund-reason-panel">
              <span class="reason-label">退款原因：</span>
              <el-input
                class="reason-input"
                type="textarea"
                :rows="6"
                placeholder="限30字内"
                v-model="refundData.description">
              </el-input>
            </el-col>
          </el-row>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="isShowRefundModal = false">取消</el-button>
          <el-button type="primary" @click="handleRefund">确定退款</el-button>
        </div>
      </el-dialog>
    </div>
    <RightAside :questionList="questionList" :getRefDom="getRefDom" ref="rightAsideDom"/>
  </div>
</template>
<script>
  import { getFourSelectDay } from "@utils";
  import { filterTableMixin } from "@utils/mixin";
  import { mapGetters } from 'vuex';
  import { vendingOrderExportApi } from "@api/device-management/";
  import { orderManualRefund, getOrderList } from "@api/transaction-management/";
  import TimeQuickSelect from '../../components/TimeQuickSelect';

  export default {
    components: {
      TimeQuickSelect
    },
    mixins: [ filterTableMixin ],
    data() {
      return {
        exportFileloading: false,
        questionList: [
          {
            value: '能否支持订单数据导出？', flag: 41, type: '交易订单', code: 'dealOrder',
            content: '支持，可支持查询时间跨度为半年，支持单个月订单数据导出。'
          },
          {
            value: '如何设置自动退款？', flag: 45, type: '退款问题', code: 'refundQuestion'
          },
          {
            value: '退款逻辑是怎样的？', flag: 49, type: '退款问题', code: 'refundQuestion'
          },
          {
            value: '异常订单如何处理？', flag: 43, type: '交易订单', code: 'dealOrder'
          },
        ],
        todayTimeStamp: new Date(new Date().toLocaleDateString()).getTime(),
        refundData: {
          detailList: [],
          amountAll: 0,
          description: ''
        }, //退款
        refundDataAmountAll: 0, //退款金额
        multipleSelection: [], //订单退款
        isShowRefundModal: false, //是否显示退款弹窗
        search: {
          outTradeNo: "",
          lyyEquipmentGroupId: "",
          type: "",
          lyyUserId: "",
          value: "",
          date: []
        },
        typeDict: {
          Pay: "已支付",
          Refund: "已退款",
          Prepare: "待支付"
        },
        rowData: {},
        currentStatus: 1,
        isUsePlatForm: false,
        siteList: [],
        tableOptions: {
          pageSize: 300,
          pageIndex: 1,
          total: 0,
          handleWidth: 100,
          pageSizeList: [ 300 ],
          columnDefs: [
            {
              field: "wechatTrxid",
              displayName: "交易单号",
              align: "center",
            },
            {
              field: "outTradeNo",
              displayName: "商户单号",
              align: "center",
            },
            {
              field: "name",
              displayName: "所属场地",
              align: "center",
            },
            {
              field: "value",
              displayName: "设备编号",
              align: "center",
            },
            {
              field: "lyyMaterialName",
              displayName: "商品名称",
              align: "center",
            },
            {
              field: "tradeType",
              displayName: "支付方式",
              width: 70,
              align: "center",
              cellTemplate: `<span>{{row.tradeType | tradeTypeFilter}}</span>`
            },
            {
              field: "originalFee",
              displayName: "订单金额",
              width: 70,
              align: "center",
              cellTemplate: `<span>{{row.originalFee | moneyFilter}}</span>`
            },
            {
              field: "actualFee",
              displayName: "优惠金额",
              width: 70,
              align: "center",
              cellTemplate: `<span>{{
            (row.actualFee === null &&
            (row.couponFee || row.discountFee || row.platformFee) ?
            (row.couponFee || row.discountFee || row.platformFee)
            : row.actualFee) | moneyFilter
            }}</span>`
            },
            {
              field: "totalFee",
              displayName: "实付金额",
              width: 70,
              align: "center",
              cellTemplate: `<span>{{row.totalFee | moneyFilter}}</span>`
            },
            {
              field: "type",
              displayName: "支付状态",
              align: "center",
              cellTemplate: `<span :class="row.type === 'Pay'?'success':'error'">{{row.typeText}}</span>`
            },
            {
              field: "created",
              displayName: "下单时间",
              align: "center",
            },
            {
              field: "lyyUserId",
              displayName: "客户ID",
              align: "center",
              handleClick: (row) => {
                this.toCustomerPage(row.lyyUserId);
              },
              cellTemplate: `<span class="link-color cursor-pointer">{{row.lyyUserId}}</span>`
            },
            {
              field: "remarks",
              displayName: "设备备注",
              align: "center",
            },
          ]
        }
      };
    },
    computed: {
      ...mapGetters([ 'placeList' ]),
      goodsCount() {
        return function (data) {
          return `${ data / 1000 } kg`
        }
      },
    },
    watch: {
      placeList(val) {
        this.siteList = val;
      },
    },
    created() {
      this.$store.dispatch('GetPlaceList');
    },
    mounted() {
      this.$nextTick(() => {
        this.getTableData();
      });
    },
    methods: {
      getInitDate({ start, end }) {
        this.search.date = [ start, end ];
      },
      exportExcel() {
        if (this.tableData.length === 0) {
          this.$message({
            message: '暂无数据',
            type: 'error'
          });
          return;
        }
        this.$confirm(
          '确定要导出数据么？',
          '导出数据', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(() => {
          this.exportFileloading = true;
          let pageIndex = this.tableOptions.pageIndex;
          const exportFile = () => {
            let params = {
              pageIndex,
              pageSize: this.tableOptions.pageSize,
              startDate: this.search.date[0],
              endDate: this.search.date[1],
              lyyUserId: this.search.lyyUserId,
              outTradeNo: this.search.outTradeNo,
              lyyEquipmentGroupId: this.search.lyyEquipmentGroupId,
              type: this.search.type,
              value: this.search.value,
            };
            vendingOrderExportApi(params);
          };

          exportFile();

          let timer = setInterval(() => {
            if (this.tableOptions.total <= pageIndex * this.tableOptions.pageSize) {
              clearInterval(timer);
              timer = null;
              this.exportFileloading = false;
              console.log('page:', pageIndex);
              return;
            }
            pageIndex++;
            exportFile();
          }, 5000)
        }).catch(() => {
          this.loading = false;
        });
      },
      clearFilterPicker() {
        this.search = {
          outTradeNo: "",
          lyyEquipmentGroupId: "",
          type: "",
          lyyUserId: "",
          value: "",
          date: [],
        };
        const dateMap = getFourSelectDay('today');
        this.getInitDate(dateMap);
        this.getTableData();
      },
      toCustomerPage(lyyUserId) {
        this.$router.push({
          path: '/user-manage/user-details',
          query: {
            lyyUserId
          }
        })
      },
      toOrderDetail(row) {
        this.$router.push({
          path: '/order-detail',
          query: row
        })
      },
      handleSizeChange(pageSize) {
        this.tableOptions.pageIndex = 1;
        this.tableOptions.pageSize = pageSize;
        this.getTableData()
      },
      handleCurrentChange(pageIndex) {
        this.tableOptions.pageIndex = pageIndex;
        this.getTableData()
      },
      async getTableData(dateMap) {
        if (dateMap) {
          this.search.date = [ dateMap.start, dateMap.end ];
        }
        let params = {
          pageIndex: this.tableOptions.pageIndex,
          pageSize: this.tableOptions.pageSize,
          startDate: this.search.date[0],
          endDate: this.search.date[1],
          lyyUserId: this.search.lyyUserId,
          outTradeNo: this.search.outTradeNo,
          lyyEquipmentGroupId: this.search.lyyEquipmentGroupId,
          type: this.search.type,
          value: this.search.value,
        };
        const res = await getOrderList(params);
        if (res.result === 0) {
          this.tableData = res.data.items.map(v => ({
            ...v,
            typeText: this.typeDict[v.type],
            lyyMaterialName: +v.businessType === 61 ? '套餐充值' : v.lyyMaterialName
          }));
          this.tableOptions.total = res.data.total;
        } else {
          this.$message.error(res.description);
        }
      },
      showRefundModal(row) {
        this.isShowRefundModal = true;
        this.multipleSelection = [];
        this.getPaymentDetail(row);
      },
      async handleRefund() {
        const { eValue } = this.refundData;
        if (!eValue) {
          const res = await orderManualRefund({
            outTradeNo: this.refundData.outTradeNo,
          });
          if (res.result === 0) {
            this.isShowRefundModal = false;
            this.$message.success("退款成功");
            setTimeout(() => {
              this.getTableData();
            }, 2000);
          }
          return;
        }
        //手工退款
        this.refundData.description = this.refundData.description || "";
        let _this = this;
        if (this.multipleSelection.length < 1) {
          this.$message.error("请勾选商品");
        } else if (this.refundData.description.length > 30) {
          this.$message.error("退款原因字数不得超过30个字符");
        } else {
          let url = "/vending/order/manualRefund";
          let totalFee = 0,
            positionsArray = [];
          this.multipleSelection.forEach(item => {
            if (+item.pricingMode === 1) {
              totalFee += +(item.amount).toFixed(2);
            } else {
              totalFee += +(item.amountPrice * item.quantity * 100).toFixed(0);
            }
            let listItem = {
              channelNo: item.channelNo,
              refundCount: item.quantity,
              refundAmount: +item.pricingMode === 1 ? item.amount.toFixed(0) : (item.amountPrice * item.quantity * 100).toFixed(0),
              lyyMainboardId: item.lyyMainboardId,
              lyyMainboardPositionId: item.lyyMainboardPositionId
            };
            positionsArray.push(listItem);
          });
          let params = {
            outTradeNo: this.refundData.outTradeNo,
            refundAmount: totalFee,
            positions: positionsArray,
            description: this.refundData.description
          };

          let options = {
            method: "post",
            url: url,
            tag: "",
            params: params,
            sucCallback: callback,
            status: "0"
          };
          this.httpRequest(options);

          function callback(tag, res) {
            if (res.result === 0) {
              _this.isShowRefundModal = false;
              _this.$message.success("退款成功");
              setTimeout(() => {
                _this.getTableData();
              }, 2000);
            } else {
              _this.$message.error(res.disabledDate);
            }
          }
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.computedRefundTotal();
      },
      handleChangeQuantity() {
        this.computedRefundTotal();
      },
      computedRefundTotal() {
        let refundTotal = 0;
        this.multipleSelection.forEach(item => {
          if (+item.pricingMode === 1) {
            refundTotal += item.amount / 100
          } else {
            refundTotal += item.amountPrice * item.quantity
          }
        });
        this.refundDataAmountAll = refundTotal
      },
      getPaymentDetail(row) {
        this.isUsePlatForm = row.platformFee;
        let url = "/vending/order/getPaymentDetail";
        let _this = this;
        let params = {
          status: 'Pay',
          outTradeNo: row.outTradeNo
        };
        for (let key in this.typeDict) {
          if (row.type === this.typeDict[key]) {
            params.status = key
          }
        }
        let options = {
          method: "get",
          url: url,
          params: params,
          sucCallback: callback,
          status: "0"
        };
        this.httpRequest(options);

        function callback(tag, res) {
          if (res.result === 0) {
            _this.refundData = res.data;
            _this.refundData.lyyUserId = row.lyyUserId; //用户id
            _this.refundData.outTradeNo = row.outTradeNo; //订单编号
            _this.refundData.maxTotalFee = row.totalFee; //订单总金额
            _this.refundDataAmountAll = 0; //订单总金额
            _this.refundData.detailList.forEach(items => {
              if (items.perActualPay || items.perActualPay === 0) {
                items.amountPrice = items.perActualPay / 100
              } else {
                items.amountPrice = ((items.amount / items.quantity) / 100).toFixed(2)
              }
              items.maxQuantity = JSON.parse(JSON.stringify(items.quantity));
            });
            // 使用平台券全额退款
            if (_this.isUsePlatForm) {
              _this.multipleSelection = _this.refundData.detailList;
              _this.computedRefundTotal();
            }
          }
        }
      }
    }
  };
</script>
<style lang="less" scoped>
  .order-list {
    .title {
      margin: 17px 0;
      font-size: 14px;
      color: #41475F;
      text-align: left;
    }

    .el-dialog {

      .refund-modal-container {
        padding: 0 45px;

        .refund-modal-header {
          justify-content: space-between;

          .name {
            font-size: 14px;
            color: #41475F;
            margin-right: 22px;
          }

          .number {
            font-size: 14px;
            color: #9e9e9e;
          }
        }
      }

      .tips-1 {
        margin: 20px 0 20px;
        text-align: left;
        color: #C74444;

        .title {
          font-size: 14px;
          color: #2F75F5;
        }

        .amount {
          margin-left: 32px;
          margin-right: 18px;
          font-size: 13px;
          color: #353841;
        }

        .refund {
          color: #353841;
          font-size: 14px;
        }
      }

      .tips-title {
        padding-bottom: 10px;
      }

      .tips-2 {
        font-size: 12px;
        line-height: 18px;
        color: #C74444;
        text-align: left;
      }

      .refund-reason-panel {
        display: flex;
        margin-top: 20px;
        text-align: left;

        .reason-label {
          width: 80px;
          color: #353841;
          font-size: 14px;
        }

        .reason-input {
          width: 290px;
          line-height: 18px;
          display: inline-block;
        }
      }

      .dialog-footer {
        text-align: center;

        .el-button {
          width: 150px;
          height: 40px;
          margin: 0 40px;
        }
      }
    }

    .el-pagination {
      padding-top: 20px;
    }

    .right_filter_panpel {
      .el-button {
        padding: 9px 15px 7px;
      }
    }
  }

  .delete-place-color {
    color: #f00;
    opacity: .3;
  }
</style>
