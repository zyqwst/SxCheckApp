package com.plugin.myPlugin;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * This class echoes a string called from JavaScript.
 */
public class MyPlugin extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("coolMethod")) {
            String message = args.getString(0);
            this.coolMethod(message, callbackContext);
            return true;
        }else if (action.equals("json")) {
             String message = args.getString(0);
            this.json(message, callbackContext);
            return true;
        }else if(action.equals("plus")) {
            int x = args.getInt(0);
            int y = args.getInt(1);
            this.plus(x,y, callbackContext);
            return true;
        }
        return false;
    }

    private void coolMethod(String message, CallbackContext callbackContext) {
        if (message != null && message.length() > 0) {
            callbackContext.success("TS传入的值："+message);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }
    //传入JSON
    private void json(String msg, CallbackContext callbackContext){
        callbackContext.success("plus方法："+msg);
    }
    //传入两个参数求和
    private void plus(int x,int y,CallbackContext callbackContext){
        callbackContext.success(x+y);
    }
}
