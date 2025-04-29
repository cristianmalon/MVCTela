using MVCBase.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace CAMTEX.Web.Security
{
    public class UserSystemAttribute : AuthorizeAttribute
    {
        protected override bool IsAuthorized(HttpActionContext httpContext)
        {
            var authroized = base.IsAuthorized(httpContext);
            if (!authroized)
            {
                return false;
            }

            var AuthAccount = VariablesWeb.Usuario;
            if (AuthAccount == null)
            {
                return false;
            }

            return true;
        }
    }
}