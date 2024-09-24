
const fs = require("fs");
const path = require("path")
const join = path.join;
const resolve = path.resolve;
const pathName = "articles"

//创建文件夹和文件的映射
function createSidebarMapObject (dir) {
    let fileMapObj = {};
    const temPath = resolve(__dirname, "..", dir);
    function getAllFiles (curPath) {
        const files = fs.readdirSync(curPath);
        files.forEach(function (file, index) {
            let fPath = join(curPath, file);
            let stat = fs.statSync(fPath);
            if (stat.isDirectory()) {
                fileMapObj[fPath] = [];
                getAllFiles(fPath);
            }
            if (stat.isFile()) {
                const fileObj = path.parse(fPath);
                const fileName = fileObj.name;
                if (Array.isArray(fileMapObj[curPath])) {
                    // const link = getLink(fPath)
                    fileName === "README" ? fileMapObj[curPath].unshift('') : fileMapObj[curPath].push(fileName)
                }
            }
        })

    }
    getAllFiles(temPath);
    fileMapObj
    return fileMapObj;
}
function getLink (link) {
    let tempLink = link.replace(/\\/g, "/");
    const index = tempLink.indexOf(pathName);
    tempLink = tempLink.slice(index - 1) + "/";
    return tempLink;
}

function createArticlesNavItem (fileMapObj) {
    let navItem = [];
    Object.keys(fileMapObj).forEach(function (title) {
        let tempTitle = title.replace(/\\/g, "/");
        const index = tempTitle.indexOf(pathName);
        const lastIndex = tempTitle.lastIndexOf("/");
        const link = tempTitle.slice(index - 1) + "/";
        const text = tempTitle.slice(lastIndex + 1);
        navItem.push({ text, link });
    })

    return navItem;
}
function createSideBar (fileMapObj) {
    const sidebar = {};
    Object.keys(fileMapObj).forEach(function (key) {
        const link = getLink(key);
        const list = fileMapObj[key].sort((a,b)=>{
            if(a === "") return -1;
            const strs1 = a.split("、");
            const strs2 = b.split("、");
            const numIndex = strs1.length>1?strs1[0]:0;
            const numIndex2 = strs2.length>1?strs2[0]:0;
            return numIndex - numIndex2;
        })
        sidebar[link] = list;
    })
    return sidebar;
}
const getSidebarMapObject = createSidebarMapObject(pathName)
const sidebar = createSideBar(getSidebarMapObject);
const articlesNavItem = createArticlesNavItem(getSidebarMapObject)
module.exports = {
    base: '/blog/',
    title: '前端WebGL',
    port: 8002,
    themeConfig: {
        nav: [
            {
                text: '图形学', link: '/articles/webgl/'
            },
            {
                text: 'threejs', link: '/articles/threejs/'
            }
        ],
        sidebar,
        sidebarDepth: 3,
        lastUpdated: 'Last Updated',
        smoothScroll: true
    },
}