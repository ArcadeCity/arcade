module.exports = { createSubscriptionRequest, createTimestampedObject }

function createTimestampedObject(userContext, events, done) {
  const data = { timestamp: Date.now(), hello: 'world' }
  // set the "data" variable for the virtual user to use in the subsequent action
  userContext.vars.data = data
  // console.log(userContext)
  return done()
}

// use timestamp as sub id
function createSubscriptionRequest(userContext, events, done) {
  const data = `["REQ","${Date.now()}",{"kinds":[0,1,4,40,41,42]}]`
  userContext.vars.data = data
  return done()
}
