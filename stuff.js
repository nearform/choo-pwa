
// function FunctionPromise (origin) {
//   const promise = Promise.resolve(origin)
//   const result = (...args) => FunctionPromise(promise.then(fn => fn(...args)))
//   Object.assign(result, promise)
//   // result.then = promise.then.bind(promise)
//   // result.catch = promise.catch.bind(promise)
//   console.log(result)
//   return result
// }

function FunctionPromise (origin) {
  const promise = Promise.resolve(origin)
  function result (...args) {
    return FunctionPromise(promise.then(fn => fn(...args)))
  }

  result.__proto__ == FunctionPromise.prototype
  for (const prop in promise) {
    console.log(prop)
    if (promise.hasOwnProperty(prop)) {
      result[prop] = promise[prop]
    }
  }
  console.log(promise)
  return result
  // return new Proxy(promise, {
  //   apply: function (target, thisArg, args) {
  //     return FunctionPromise(target.then(fn => fn(...args)))
  //   }
  // })
}

// a.js

const fn = async (foo, bar) => {
  return await foo + '_' + await bar
}

//

const loader = new Promise(resolve => setTimeout(() => resolve(fn), 1000))

const fnp = FunctionPromise(loader)

fnp(
  fnp('foo1', 'bar1'),
  fnp('foo2', 'bar2')
).then(res => console.log(res))

// console.log(res)
// .then(res => console.log('last', res))

// fnp.then(fn2 => {
//   console.log(fn.toString())
//   fn2('foo')('bar')
// })

// const step1 = fnp('foo')
// console.log('step1', step1)
// console.log('step1.then', step1.then)

// const step2 = step1('bar')
// console.log('step2', step2)
// console.log('step2.then', step2.then)

// console.log('test', fnp('foo')('bar'))

// step2.then(arg => console.log('step2.then', arg.toString()))
// console.log('step2.then', step2.then)

// step2.then(valor => console.log(valor))

// setTimeout(() => fnp('foo')('bar'), 2000)

// const result = fnp('foo')('bar')
