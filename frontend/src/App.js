"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
require("./App.css");
var chatbox_1 = require("./components/whatsapp/chatbox");
var floatingIcon_1 = require("./components/whatsapp/floatingIcon");
function App() {
    var themeList = ["", "theme-dark", "theme-white"];
    var _a = (0, react_1.useState)(themeList[2]), theme = _a[0], setTheme = _a[1];
    (0, react_1.useEffect)(function () {
        document.documentElement.className = theme;
    }, [theme]);
    var _b = (0, react_1.useState)(false), toggel = _b[0], setToggle = _b[1];
    return (<div className="bg-bg_primary h-screen">
      <div className="h-10 w-full flex pl-5 items-center gap-5">
        <div className="bg-[#1a1a1a] rounded-full h-5 w-5" onClick={function () { return setTheme(themeList[1]); }}></div>
        <div className="bg-[#afb5bd] rounded-full h-5 w-5" onClick={function () { return setTheme(themeList[2]); }}></div>
      </div>
      {toggel && <chatbox_1.default toggel={setToggle}/>}
      <floatingIcon_1.default toggel={setToggle}/>
    </div>);
}
exports.default = App;
