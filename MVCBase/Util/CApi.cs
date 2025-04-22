using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CAMTEX.Aplicacion.Entidades;
using CAMTEX.Entidades;
using RestSharp;
using Newtonsoft.Json;
using System.Configuration;
using System.Security.Cryptography.X509Certificates;
using System.Net.Security;


namespace MVCBase.Util
{
    public class CApi
    {

        private static string urlApi= ConfigurationManager.AppSettings["uriAPI"];
        public static IRestResponse ServicePost2(string url, object datos)
        {
            //System.Net.ServicePointManager.CertificatePolicy= new MyPolicy();
            //        System.Net.ServicePointManager.ServerCertificateValidationCallback +=
            //(se, cert, chain, sslerror) =>
            //{
            //    return true;
            //};
            System.Net.ServicePointManager.ServerCertificateValidationCallback += delegate (
            object sender,
            X509Certificate cert,
            X509Chain chain,
            SslPolicyErrors sslPolicyErrors)
            {
                if (sslPolicyErrors == SslPolicyErrors.None)
                {
                    return true;   //Is valid
                }

                if (cert.GetCertHashString() == "461ac5d6d1ac053ca30dcddc401e75b1a1949c8d")
                {
                    return true;
                }

                return false;
            };

            var client = new RestClient(urlApi+ url);
            client.Timeout = -1;
            var request = new RestRequest(Method.POST);
            request.AddHeader("Content-Type", "application/json");
            request.AddParameter("application/json", JsonConvert.SerializeObject(datos), ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);

            return response;
        }

    }
}