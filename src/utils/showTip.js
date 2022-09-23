const toast = {
    showToast(level, text) {
        if (typeof level != "number") {
            console.error("bad parameter: Level requires a number, not a " + typeof level)
            return
        }
        if (text == undefined || text == "") {
            console.error("bad parameter: Content needs to have value")
            return
        }
        var dom = document.createElement("toast");
        let iconList = ["larry-zhengque", "larry-cuowu", "larry-xinxi", "larry-gonggao"]
        let colorList = ["#44c28a", "#ff0000", "#f7931e", "#666"]
        dom.className = "toast"; //给我们创建的dom节点写一个类名
        dom.id = "toast" //这是id
        dom.style.position = "fixed"
        dom.style.left = "50%"
        dom.style.top = "18%"
        dom.style.boxShadow = "2px 2px 15px #00000044"
        dom.style.padding = "10px"
        dom.style.borderRadius = "100px"
        dom.style.opacity = "0"
        dom.style.transition = "0.5s"
        dom.style.color = "#333"
        dom.style.fontSize = "18px"
        dom.style.display = "flex"
        dom.style.alignItems = "center"
        dom.style.transform = "translateX(-50%) translateY(-50%)"
        dom.style.background = colorList[level - 1]
        dom.innerHTML = "<span class='iconfont " + iconList[level - 1] + "' style='color:#fff" + ";padding-right:10px;font-size:18px'></span>" + `<span style='color:#fff'>${text}</span>;`
        setTimeout(() => {
            dom.style.opacity = "1"
            dom.style.top = "20%"
        }, 100)
        setTimeout(() => {
            dom.style.opacity = "0"
            dom.style.top = "18%"
        }, text.length >= 12 ? 8000 : 5000)
        console.log()
        document.getElementById("app").appendChild(dom);
        setTimeout("document.getElementById('toast').remove()", text.length >= 12 ? 8500 : 5500) //事情办完
    },
    closeToast() {
        document.getElementById('toast').remove()
    }
}
export default toast


// WEBPACK FOOTER //
// ./src/utils/showTip.js