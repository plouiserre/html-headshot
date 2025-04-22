const CompareTagArrays = (expecteds, results)=>{
    if(expecteds.length !== results.length)
        return false;
    else{
        for(let i = 0; i < expecteds.length; i ++){
            const expected = expecteds[i];
            const result = results[i];
            const isEqual = CompareTagObject(expected, result);
            if(isEqual)
                continue;
            else
                return false;
        }
    }
    return true;
}

const CompareTagObject = (expected, result)=>{
    const expectStringify = JSON.stringify(expected);
    const resultStringify = JSON.stringify(result);
    const tagsAreEqual = expectStringify === resultStringify;
    if(tagsAreEqual)
        return true;
    else
        return false;
}
const compareArrays = (expectedArrays, resultArrays) =>{
    let isEqual = true;
    if(expectedArrays.length !== resultArrays.length)
        return false;
    else{
        for(let i = 0; i < expectedArrays.length; i ++){
            const expected = expectedArrays[i];
            const result = resultArrays[i];
            if(expected !== result){
                isEqual = false;
                break;
            }
        }
    }
    return isEqual;
}

export {CompareTagObject, CompareTagArrays}