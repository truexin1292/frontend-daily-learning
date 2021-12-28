class RangeList {
  constructor() {
    this.list = [];
  }

  add([start, end]) {
    const addList = new Array(end - start).fill('');
    const resultList = [];

    addList.forEach((_, i) => {
      if (!this.list.includes(start + i)) {
        resultList.push(start + i);
      }
    })

    this.list.push(...resultList);
    this.list.sort((a, b) => a - b);
  }

  remove([start, end]) {
    const removeList = new Array(end - start).fill('');

    removeList.forEach((_, i) => {
      if (start + i) {
        this.list = this.list.filter(v => v !== start + i);
      }
    });
  }

  print() {
    const printList = [];
    let itemList = [];

    this.list.forEach((v, i) => {
      itemList.push(v);
      if (this.list[i] + 1 != this.list[i + 1]) {
        const copyList = itemList.map(v => v)
        printList.push(copyList);
        itemList = [];
      }
    })

    let finalPrintListStr = '';
    printList.forEach(v => {
      finalPrintListStr += '[' + v[0] + ', ' + (v[v.length - 1] + 1) + ')  ';
    })

    console.log(finalPrintListStr);
  }
}