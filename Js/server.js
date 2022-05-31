function makeId(l) {
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('').sort(()=>{return 0.5-Math.random()}).join('').substring(0, l);
  }

  console.log(makeId(1))