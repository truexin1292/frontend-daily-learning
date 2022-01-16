<script lang="jsx">
import { ref } from "vue";
export default {
  setup() {
    const counter = ref(0);
    const addCounter= () => {
      counter.value++;
      console.log('log:','33');
    }

    return () => (
      <>
        <p>这是jsx组件</p>
        <div onClick={addCounter}>我是comp{counter.value}</div>
      </>
    );
  },
};
// export default {
//   data() {
//     return {
//       counter: 1
//     }
//   },
//   methods: {
//     addCounter(){
//       this.counter++;
//     }
//   },
//   render() {
//     return (
//       <>
//         <p>这是jsx组件</p>
//         <div onClick={this.addCounter}>我是comp{this.counter}</div>
//       </>
//     );
//   },
// };
</script>
<style scoped></style>
