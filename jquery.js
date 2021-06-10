window.jQuery = function (selectorOrArray) {//selectorOrArray是接受的选择器或者数组
    let elements
    if(typeof selectorOrArray === 'string'){
        elements = document.querySelectorAll(selectorOrArray)
    }else if(selectorOrArray instanceof Array){
        elements = selectorOrArray
    }
    
    //api可以
    // const api = {//声明的是一个对象
    //       //闭包：函数访问外部变量
    //     addClass: function(className){//可以简写成addClass(className),所谓键值对
    //         for(let i=0;i<elements.length;i++){
    //             elements[i].classList.add(className)
    //         }   
    //         //return api 
    //         return this  //一个函数的第一个参数就是函数前面的那个东西，也是this
    //     }
    // }
    // return api


    //上面内容表示如下代码逻辑
    return {//声明的是一个对象
        oldApi: selectorOrArray.oldApi,
        addClass(className) {
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.add(className)
            }
            //return api 
            return this  //一个函数的第一个参数就是函数前面的那个东西，也是this
        },
        //find是找到#xxx里的.red元素
        find(selector) {
            let array = []
            for (let i = 0; i < elements.length; i++) {
                const elements2 = Array.from(elements[i].querySelectorAll(selector)) 
                array = array.concat(elements2)
            }
            // const newApi = jQuery(array)
            // return newApi     //返回新的对象，防止污染之前的对象
            array.oldApi = this
            return jQuery(array)
        },

        //结束对当前选择器的操作，返回上一个选择器
        end(){
            return this.oldApi
        },

        //用于遍历当前elements中的所有元素
        each(fn){
            for(let i = 0; i < elements.length; i++){
                fn.call(null,elements[i],i)
            }
            return this
        },
        //获取爸爸
        parent(){
            const array = []
            this.each((node)=>{
                //indexOf() 方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1
                if(array.indexOf(node.parentNode) === -1){
                    array.push(node.parentNode)
                }
            })
            return jQuery(array)
        },

        //获取儿子
        children(){
            const array = []
            this.each((node)=>{
                if(array.indexOf(node.parentNode) === -1){
                    //将node.children中的每一项分别作为第0项，第1项。。。。
                    array.push(...node.children)
                }
            })
            return jQuery(array)
        },
        //打印出当前的elements
        print(){
            console.log(elements)
        }
    }
}