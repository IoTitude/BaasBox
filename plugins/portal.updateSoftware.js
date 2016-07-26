/*
 * Plugin for updating the software version of a KaMU
 */

var lib = require('library.shared')

http().put(function (req) {
  // Check that user has the required rights
  if (!Box.isAdmin()) {
    return {status: 401}
  }

  try {
    var body = req.body
    var datetime = body.datetime
    var kamu = body.kamu
    Box.log(kamu)
    var versionTag = kamu.swVersion
    var hash = kamu.hash

    Box.log(hash)
    // Current setup of java rest api only takes in form data. Can't parse into json.
    var data_to_send = "&datetime=" + datetime + "&versionTag=" + versionTag + "&hash=" + hash + "&"
    Box.log(data_to_send)

    // Post the command to AdminKaMU
    var result_REST = Box.WS.post(
      lib.JAVA_REST_URL + "/updateDevice",
      data_to_send,
      {
        params: {},
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    )
    Box.log(result_REST)

    // Update the information in the database only on success
    if (result_REST.status === 200) {
      var result = lib.update(kamu)
    } else {
      return { status: result_REST.status, content: result_REST }
    }


  } catch (error) {
    Box.log(error)
    return {status: 500, content: error}
  }

  return {status: 200, content: result}
})
