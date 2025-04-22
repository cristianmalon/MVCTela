using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Security;

namespace MVCBase.Models
{
    public class VariablesWeb
    {
    }

    public class MetodosWeb
    {
        public HttpCookie SetCookies<T>(T obj, string NombreCookie)
        {
            var cookieText = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(obj));
            var encryptedValue = Convert.ToBase64String(MachineKey.Protect(cookieText, "ProtectCookie"));


            HttpCookie myCookie = new HttpCookie(NombreCookie);
            myCookie.Value = encryptedValue;
            myCookie.Expires = DateTime.Now.AddDays(7);
            return myCookie;
        }

        public T GetCookies<T>(HttpCookie Cookie)
        {
            var bytes = Convert.FromBase64String(Cookie.Value);
            var output = MachineKey.Unprotect(bytes, "ProtectCookie");
            string result = Encoding.UTF8.GetString(output);
            return JsonConvert.DeserializeObject<T>(result);

        }

        public HttpCookie DeleteCookies<T>(T obj, string NombreCookie)
        {
            var cookieText = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(obj));
            var encryptedValue = Convert.ToBase64String(MachineKey.Protect(cookieText, "ProtectCookie"));


            HttpCookie myCookie = new HttpCookie(NombreCookie);
            myCookie.Value = encryptedValue;
            myCookie.Expires = DateTime.Now.AddDays(-1);
            return myCookie;
        }
    }
}