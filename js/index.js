(function () {
  var testTool = window.testTool;
  console.log("checkSystemRequirements");
  console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

  // it's option if you want to change the WebSDK dependency link resources. setZoomJSLib must be run at first
  // if (!china) ZoomMtg.setZoomJSLib('https://source.zoom.us/1.7.9/lib', '/av'); // CDN version default
  // else ZoomMtg.setZoomJSLib('https://jssdk.zoomus.cn/1.7.9/lib', '/av'); // china cdn option
  // ZoomMtg.setZoomJSLib('http://localhost:9999/node_modules/@zoomus/websdk/dist/lib', '/av'); // Local version default, Angular Project change to use cdn version
  ZoomMtg.preLoadWasm();

  /* API key and secret needs to be changed and taken from env */
  var API_KEY = "FQBCB2bERoKS2JKqxb0btw";
  var API_SECRET = "4m9yyPTU1loXK5HbSZVDg6EY4UxbEd258eW9";

  // click join class button
  document
    .getElementById("join_iframe")
    .addEventListener("click", function (e) {
      e.preventDefault();
      var meetingConfig = testTool.getMeetingConfig();
      if (!meetingConfig.mn || !meetingConfig.name) {
        alert("Meeting number or username is empty");
        return false;
      }
      var signature = ZoomMtg.generateSignature({
        meetingNumber: meetingConfig.mn,
        apiKey: API_KEY,
        apiSecret: API_SECRET,
        role: meetingConfig.role,
        success: function (res) {
          console.log(res.result);
          meetingConfig.signature = res.result;
          meetingConfig.apiKey = API_KEY;
          var joinUrl =
            testTool.getCurrentDomain() +
            "/meeting.html?" +
            testTool.serialize(meetingConfig);
          testTool.createZoomNode("websdk-iframe", joinUrl);
        },
      });
    });
})();
