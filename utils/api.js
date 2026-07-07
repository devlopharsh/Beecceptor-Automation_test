import { request } from "@playwright/test";

export async function triggerCallout(url){

    const context = await request.newContext();

    const response = await context.get(url);

    return response;

}