
namespace media_ts {
//
export const remove  = i18n_ts.remove;

const $dic = new Map<string, HTMLElement>();

export function $(id : string) : HTMLElement {
    let ele = $dic.get(id);
    if(ele == undefined){
        ele = document.getElementById(id)!;
        $dic.set(id, ele);
    }

    return ele;
}

export function $div(id : string) : HTMLDivElement {
    return $(id) as HTMLDivElement;
}

export function $inp(id : string) : HTMLInputElement {
    return $(id) as HTMLInputElement;
}

export function $sel(id : string) : HTMLSelectElement {
    return $(id) as HTMLSelectElement;
}
        
export class MyError extends Error {
    constructor(text : string = ""){
        super(text);
    }
}

export function assert(b : boolean, msg : string = ""){
    if(!b){
        throw new MyError(msg);
    }
}    

export function msg(txt : string){
    console.log(txt);
}

export function range(n: number) : number[]{
    return [...Array(n).keys()];
}

export function last<T>(v : Array<T>) : T {
    return v[v.length - 1];
}

export function unique<T>(v : Array<T>) : T[] {
    let set = new Set<T>();
    const ret : T[] = [];
    for(const x of v){
        if(!set.has(x)){
            set.add(x);
            ret.push(x);
        }
    }
    return ret;
}

export function sum(v : number[]) : number {
    return v.reduce((acc, cur) => acc + cur, 0);
}

export async function fetchText(fileURL: string) {
    const response = await fetch(fileURL);
    const text = await response!.text();

    return text;
}

export function parseURL(): [string, string, Map<string, string>] {
    const url = document.location.href;
    const parser = new URL(url);
    // console.log(`href:${url} origin:${parser.origin} pathname:${parser.pathname} search:${parser.search}`)
    assert(parser.origin + parser.pathname + parser.search == url);

    const queryString = parser.search.substring(1);
    const queries = queryString.split("&");

    const params = new Map<string, string>();
    queries.forEach(query => {
        const [key, value] = query.split("=");
        params.set(decodeURIComponent(key), decodeURIComponent(value));
    });
    
    return [ parser.origin, parser.pathname, params];
}

}
