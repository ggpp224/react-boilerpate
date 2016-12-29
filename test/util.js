/**
 * Created by guopeng on 16/5/31.
 */

function getInstance(wrapper) {
    return wrapper.instance().refs.wrappedInstance;
}

export {
    
    //only in full dom rendering
    getInstance
}