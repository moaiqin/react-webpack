//修饰器测试,是类或者对象适用的修饰器
export const  testByClass = (target) => {
     target.test = '莫绍补';
     target.prototype.use = '修饰器';
} 

//对象的属性适用的修饰器,修饰对象，可以传多个参数
export const decoratorByClass = (agr1,agr2) => (target) =>{
    // console.log(agr1,'agr1');
    // console.log(target,'target');
    target.decorator = '属性修饰器 +' + agr1;
}


//多个修饰器进去的时候是参数按顺序传入，返回的是按倒叙如：
// @decoratorByClass1(false) 
// @decoratorByClass2(true)
//false class1 
//true class2
//true 返回的class2 bool
//false 返回的class1 bool
//最后的值为false
export const decoratorByClass1 = (bool) => {
    console.log(bool,'class1');
    return (target) => {
        console.log(bool,'返回的class1 bool');
        target.bool = bool;
    }
}

export const decoratorByClass2 = (bool) => {
    console.log(bool,'class2');
    return (target) => {
        console.log(bool,'返回的class2 bool')
        target.bool = bool;
    }
}

//修饰属性，第一参数是对象（类），2是修饰的属性name，3该属性描述对象 {configurable:true//是否可枚举,}
export const decoratorByProp = (target,name,descriptor) => {
    target.decoratorByPor = '属性产值';
    console.log(name,'name7777777');
    console.log(descriptor,'decorator')
    alert(1);
    descriptor.value = () => {
        alert('修饰器修改的函数value');
    }
    return descriptor //返回与否都一样
}

//如果想传参那就外面封装一层
// export const decoratorByProp = (arg1) => (target,name,decorator) => {
//     target.decoratorByPor = '属性产值';
//     console.log(name,'name');
//     console.log(decorator,'decorator')
//     return decorator
// }

