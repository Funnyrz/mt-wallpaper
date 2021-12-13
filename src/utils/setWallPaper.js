var edge = require("electron-edge-js");
// 只在windows平台下加载
var setWallPaperFunc = edge.func(`
    using System.Threading.Tasks;
    using System.Runtime.InteropServices;

    public class Startup
    {
        public async Task<object> Invoke(object input)
        {
            string v = (string)input;
            return SystemParametersInfo(20, 1, v, 1);
        }
        [DllImport("user32.dll", EntryPoint = "SystemParametersInfo")]
	    public static extern int SystemParametersInfo(
            int uAction,
            int uParam,
            string lpvParam,
            int fuWinIni
        );
    }

`);
export { setWallPaperFunc };
