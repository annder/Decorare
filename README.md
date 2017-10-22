# A simple decorator library

A simple decorator library, written using the es6 syntax, includes an @autobind, @readonly, and so on

# How to view the source code?

```bash
    git clone git@github.com:annder/Decorare.git
```

But you need to compile the es6 grammar [bable](https://babeljs.io) for es5 syntax, and need [nodejs](https://nodejs.org/en) the compiler.

## There are several decorators:

* Time 

Method of use :

```js
    class A {
        @Time
        io(){}
    }
    new A().a();
    // a: 0ms
```

* Throttle

```js
    class  A {
        @Throttle
        io(){
            return 12;
        }
    }
```

Call after 30 milliseconds.

* Enmerable

```js
    class A {
        @Enmerable
        a(){
            return [1,2,31]
        }
    }
   for(var i in  new A().a()){
       //This method cannot be enumerated directly
   }
```

* ReadOnly

```js
    class A {
        @ReadOnly
        a(){
            return 12;
        }
    }
    var io = new A();
    io.a = function (){
        return 1;
    }
    //This method cannot be tampered with directly
```

* LazyInitialize

```js
    class A {
        @LazyInitalize
        a(){
            return 1;
        }
    }
    new A().a();
    //undefeind
```

* Decorate

```js
function Upper(x){
    return x.toUpperCase();
}
    class A {
        @Decorate(Upper)
        a(){
            return "decorate";
        }
    }
    ///DECIRFATE
```

* NoConfiger 

```js

class A {
    @NoConfiger
    a(){
        return 12;
    }
}
var io = new A();
Object.defineProperty(io,a,{
    value:1
})
//This method cannot be directly configured
```

* Override

```js
    class A {
        io(){
            return 12;
        }
    }
    class B extends A {
        @Overrider
        io(){
            return 12;
        }
    }
```


* AutoBind 

```js
class A {
    io(){
        return 12
    }
    @AutoBind
    a(){
        return this.io;
    }
}
new A().a();
```

* Mixin

```js
    function w(){
        return 12;
    }
    @Mixin(w)
    class A {
        io(){
            return 12;
        }
    }
    new A().w();
```

The Type is:

* Number_

```js
    class A {
        @Number_
        io(){
            return 1;
        }
    }
    //or call the values in decorate
    class B {
        @Number_(1)
        io(){
            return "1"
        }
    }
    new B().io();
    //1
```

* 

```js
 class A {
        @String_
        io(){
            return "String";
        }
    }
    //or call the values in decorate
    class B {
        @String_("string")
        io(){
            return "1"
        }
    }
    new B().io();
    //string
```

* Function_

```js
   class A {
        @Function_
        io(){
            return ()=>{
                //...
            }
        }
    }
    //or call the values in decorate
    function addS(x){
        return x+"s"
    }
    class B {
        @Function_()
        io(){
            return "1"
        }
    }
    new B().io();
    //(x)=>x+"s"
```

* Array_

```js
    class A {
        @Array_
        io(x){
            return [...x];
        }
    }
    //or call the values in decorate
    class B {
        @Array_([1])
        io(){
            return "1"
        }
    }
    new B().io();
    //[1]
```

