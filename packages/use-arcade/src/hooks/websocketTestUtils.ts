// @ts-nocheck
export function waitForSocketState(socket, state) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      if (socket.readyState === state) {
        resolve()
      } else {
        waitForSocketState(socket, state).then(resolve)
      }
    }, 5)
  })
}
