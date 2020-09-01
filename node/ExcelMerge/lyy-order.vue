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
        <filter-panel label="订单号：">
          <el-input placeholder="请填写订单号"
                    style="width: 148px;"
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
            @click="getTableData(true)">
            搜索
          </el-button>
          <el-button
            type="primary"
            @click="exportExcel(true)">
            导出
          </el-button>
          <el-button
            type="primary"
            @click="clearFilterPicker(true)">
            清空搜索条件
          </el-button>
        </filter-panel>
        <filter-panel class="right_filter_panpel">
          <el-button
            type="primary"
            class="status-button status-button-today"
            :class="{'active': currentStatus === 1}"
            @click="getTableData('day')">
            今天
          </el-button>
          <el-button
            type="primary"
            class="status-button"
            :class="{'active': currentStatus === 2}"
            @click="getTableData('week')">
            近7天
          </el-button>
          <el-button
            type="primary"
            class="status-button"
            :class="{'active': currentStatus === 3}"
            @click="getTableData('month')">
            近一个月
          </el-button>
        </filter-panel>
      </filter-picker>
      <el-table
        :border="true"
        :data="shjDeviceList"
        :header-cell-style="{
          backgroundColor: '#F3F3F3'
        }"
        v-loading="tableOptions.loading">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="50"/>
        <el-table-column
          label="订单号"
          prop="outTradeNo"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="所属场地"
          prop="name"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          label="设备编号"
          prop="value"
          align="center">
        </el-table-column>
        <el-table-column
          label="商品名称"
          show-overflow-tooltip
          align="center">
          <template slot-scope="scope">
            {{
            (scope.row.businessType == 61) ? '套餐充值' : scope.row.lyyMaterialName
            }}
          </template>
        </el-table-column>
        <el-table-column
          label="支付方式"
          align="center"
          width="70px">
          <template slot-scope="scope">
            {{scope.row.tradeType | tradeTypeFilter}}
          </template>
        </el-table-column>
        <el-table-column
          label="订单金额"
          align="center"
          width="70px">
          <template slot-scope="scope">
            {{scope.row.originalFee | moneyFilter}}
          </template>
        </el-table-column>
        <el-table-column
          label="优惠金额"
          align="center"
          width="70px">
          <template slot-scope="scope">
            {{
            (scope.row.actualFee === null &&
            (scope.row.couponFee || scope.row.discountFee || scope.row.platformFee) ?
            (scope.row.couponFee || scope.row.discountFee || scope.row.platformFee)
            : scope.row.actualFee) | moneyFilter
            }}
          </template>
        </el-table-column>
        <el-table-column
          label="实付金额"
          align="center"
          width="70px">
          <template slot-scope="scope">
            {{scope.row.totalFee | moneyFilter}}
          </template>
        </el-table-column>
        <el-table-column
          label="支付状态"
          align="center">
          <template slot-scope="scope">
            <span :class="scope.row.type === 'Pay'?'success':'error'">{{scope.row.typeText}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="下单时间"
          prop="created"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="客户ID"
          prop="lyyUserId"
          align="center">
          <template slot-scope="scope">
          <span class="link-color cursor-pointer"
                @click="toCustomerPage(scope.row.lyyUserId)">{{scope.row.lyyUserId}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="设备备注"
          prop="remarks"
          show-overflow-tooltip
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.remarks}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="toOrderDetail(scope.row)">查看</el-button>
            <el-button
              size="mini"
              type="text"
              @click="showRefundModal(scope.row)"
              v-if="scope.row.type === 'Pay'
              && +scope.row.businessType !== 61 // 普通售货机 - 账号充值
              && +scope.row.businessType !== 62 // 重感售货机 - 购物支付
              && +scope.row.businessType !== 39 // 重感售货机 - icCard充值
              && new Date(scope.row.created).getTime() > todayTimeStamp"
            >
              退款
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="tableOptions.pageIndex"
        :page-sizes="[20, 50, 100, 200, 300]"
        :page-size="tableOptions.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableOptions.total">
      </el-pagination>
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
              <span class="name">订单号:</span>
              <span class="number">{{refundData.outTradeNo}}</span>
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
                  <span>{{scope.row.price/100 | moneyFilter}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="quantity"
                align="center"
                label="数量">
                <template slot-scope="scope">
                  <el-input-number
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
                  <span>{{(scope.row.amountPrice * scope.row.quantity) | moneyFilter}}元</span>
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
  import { getDefaultDate } from "@utils/index";
  import { filterTableMixin } from "@utils/mixin";
  import { mapGetters } from 'vuex';
  import { vendingOrderExportApi } from "@api/device-management/";
  import { orderManualRefund } from "@api/transaction-management/";

  export default {
    mixins: [ filterTableMixin ],
    data() {
      return {
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
        tableOptions: {
          pageIndex: 1,
          pageSize: 300
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        refundData: {
          detailList: [],
          amountAll: 0,
          description: ''
        }, //退款
        refundDataAmountAll: 0, //退款金额
        multipleSelection: [], //订单退款
        isShowRefundModal: false, //是否显示退款弹窗
        shjDeviceList: [],
        search: {
          outTradeNo: "",
          lyyEquipmentGroupId: "",
          type: "",
          lyyUserId: "",
          value: "",
          // remarks: "",
          date: []
        },
        typeDict: {
          Pay: "已支付",
          Refund: "已退款",
          Prepare: "待支付"
        },
        rowData: {},
        currentStatus: 3,
        isUsePlatForm: false,
        exportFileloading: false,
        siteList: [],
      };
    },
    computed: {
      ...mapGetters([ 'placeList' ]),
    },
    watch: {
      placeList(val) {
        this.siteList = val.filter(v => v.isactive !== 'N')
      },
    },
    created() {
      let defaultDate = getDefaultDate('month')
      this.search.date = [ defaultDate.start, defaultDate.end ];
      this.$store.dispatch('GetPlaceList')
    },
    mounted() {
      this.$nextTick(() => {
        this.getTableData();
      });
    },
    methods: {
      exportExcel() {
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
      },
      clearFilterPicker() {
        this.search = {
          outTradeNo: "",
          lyyEquipmentGroupId: "",
          type: "",
          lyyUserId: "",
          value: "",
          // remarks: "",
          date: [],
        }
        let defaultDate = getDefaultDate('month')
        this.search.date = [ defaultDate.start, defaultDate.end ];
        this.getTableData()
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
      getTableData(time) {
        //交易订单查询
        let url = "/vending/order/list";
        let _this = this;
        let date = new Date();
        const getFullDate = function (date) {
          let month = date.getMonth() + 1;
          let day = date.getDate();
          if (month < 10) {
            month = '0' + month;
          }
          if (day < 10) {
            day = '0' + day;
          }
          return `${ date.getFullYear() }-${ month }-${ day }`;
        }
        let endDate = this.search.date[1];
        let startDate = this.search.date[0];
        switch (time) {
          case 'day':
            endDate = getFullDate(date);
            startDate = endDate;
            this.currentStatus = 1;
            break;
          case 'week':
            endDate = getFullDate(date);
            date.setTime(date.getTime() - 7 * 24 * 60 * 60 * 1000); // 一个星期
            startDate = getFullDate(date);
            this.currentStatus = 2;
            break;
          case 'month':
            endDate = getFullDate(date);
            date.setTime(date.getTime() - 30 * 24 * 60 * 60 * 1000); // 一个月
            startDate = getFullDate(date);
            this.currentStatus = 3;
            break;
        }
        this.search.date = [ startDate, endDate ];
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
          // remarks: this.search.remarks,
        };

        let options = {
          method: "get",
          url: url,
          params: params,
          sucCallback: callback,
          status: "0"
        };
        this.httpRequest(options);

        function callback(tag, res) {
          if (res.result == 0) {
            _this.shjDeviceList = _this.tableDataTube(res.data.items);
            _this.tableOptions.total = res.data.total;
          } else {
            _this.$message.error(res.description);
          }
        }
      },
      tableDataTube(tableData) {
        tableData.forEach(item => {
          item.typeText = this.typeDict[item.type]
        })
        return tableData
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
            totalFee += +(item.amountPrice * item.quantity * 100).toFixed(0);

            let listItem = {
              channelNo: item.channelNo,
              refundCount: item.quantity,
              refundAmount: (item.amountPrice * item.quantity * 100).toFixed(0),
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
            if (res.result == 0) {
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
        this.multipleSelection = val
        this.computedRefundTotal()
      },
      handleChangeQuantity(value, test) {
        this.computedRefundTotal()
      },
      computedRefundTotal() {
        let refundTotal = 0
        this.multipleSelection.forEach(item => {
          refundTotal += item.amountPrice * item.quantity
        })
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
          if (res.result == 0) {
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
              _this.multipleSelection = _this.refundData.detailList
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

      .filter-panpel-left {
        display: inline-block;
      }
    }

    .status-button-today {
      margin-left: -6px;
    }

    .status-button {
      background-color: #B6B6B6;
      color: #fff;
      border-color: #B6B6B6;

      &.active {
        background-color: #2F75F5;
        color: #fff;
        border-color: #2F75F5;
      }
    }
  }
</style>
