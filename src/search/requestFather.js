// export default class RequestFather{
//     constructor(domResults){
//         this.domResults = domResults;
//     }

//     findFather = (parentElementHtml) =>{
//         let parentTag = '';
//         for(let i = 0 ; i < this.domResults.length; i ++){
//             const element = this.domResults[i];
//             const equal = element.completeTag === parentElementHtml;
//             if(equal){
//                 parentTag = element;
//                 break;
//             }  
//             else
//                 continue;
//         }
//         if(parentTag ==='')
//             throw new Error(`Impossible de trouver la balise ${parentElementHtml} comme balise père`);
//         return parentTag;
//     }
// }