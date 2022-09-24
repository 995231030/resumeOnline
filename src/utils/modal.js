const modal = {
    showModal(level, text, callback) {
        if (typeof level != "number") {
            console.error("bad parameter: Level requires a number, not a " + typeof level)
            return
        }
        if (text == undefined || text == "") {
            console.error("bad parameter: Content needs to have value")
            return
        }
        var dom = document.createElement("modal");
        let iconList = ["larry-zhengque", "larry-cuowu", "larry-xinxi", "larry-gonggao"]
        let colorList = ["#44c28a", "#ff0000", "#f7931e", "#666"]
        dom.className = "modal"; //给我们创建的dom节点写一个类名
        dom.id = "modal" //这是id
        dom.style.position = "fixed"
        dom.style.width = "100%"
        dom.style.height = "100%"
        dom.style.left = "0%"
        dom.style.top = "0%"
        dom.style.boxShadow = "2px 2px 15px #00000044"
        dom.style.padding = "10px"
        // dom.style.borderRadius = "100px"
        dom.style.opacity = "1"
        dom.style.transition = "1.2s"
        dom.style.color = "#333"
        dom.style.fontSize = "18px"
        dom.style.display = "flex"
        dom.style.alignItems = "center"
        dom.style.justifyContent = "center"
        dom.style.zIndex = "9999999"
        // dom.style.transform = "translateX(-50%) translateY(-50%)"
        dom.style.background = "#6060601f"
        dom.innerHTML = `
        <div style="background:${colorList[level - 1]};padding:10px;border-radius:100px;display: flex;align-items: center;
        max-width:160px;overflow:hidden;white-space:nowrap;transition: 1.2s;" id="qes">
            <div class='iconfont ${iconList[level - 1]}' style='color:#fff;padding-right:10px;font-size:18px'></div> 
            <div style='color:#fff'>${text}</div>
            <div style='color:#fff;margin-left: 20px;cursor: pointer;' id="userConfirm">确定</div>
            <div style='color:#fff;margin-left: 20px;cursor: pointer;' id="userCancel">取消</div>
        </div>
            `
        setTimeout(() => {
            document.getElementById("qes").style.maxWidth = " 1000px"
        }, 500)

        document.getElementById("app").appendChild(dom);
        document.getElementById("userConfirm").addEventListener("click", (e) => {
            if (callback) {
                callback(true)
                this.closeModal()
            }
        })
        document.getElementById("userCancel").addEventListener("click", (e) => {
            this.closeModal()
        })
        // setTimeout("document.getElementById('modal').remove()", text.length >= 12 ? 8500 : 5500) //事情办完
    },
    closeModal() {
        document.getElementById('modal').remove()
    }
}
export default modal


// WEBPACK FOOTER //
// ./src/utils/showTip.js