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

export {CompareTagObject, CompareTagArrays}