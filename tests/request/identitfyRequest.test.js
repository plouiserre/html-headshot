import IdentifyRequest from "../../src/request/identifyRequest";
import { CompareTagArrays } from "../utils/compare";

test('identify the request writing clear', ()=>{
    const request = '.news > td > .headlines > span > li';
    const identifyRequest = new IdentifyRequest(request);

    const result = identifyRequest.analyze();

    const expected = [{"news":"class"}, {"td":"tagName"}, {"headlines":"class"}]
    CompareTagArrays(expected, result);
})