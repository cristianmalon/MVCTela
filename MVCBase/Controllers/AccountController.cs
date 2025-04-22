using System;
using System.Collections.Generic;
using System.IdentityModel.Services;
using System.IdentityModel.Tokens;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CAMTEX.Web.Models;
using RestSharp;
using CAMTEX.Aplicacion.Entidades;
using CAMTEX.Entidades;
using Newtonsoft.Json;
using System.Security.Claims;
using CAMTEX.Web.Claims;
using CAMTEX.UtilGeneral;
using System.Web.Script.Serialization;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using MVCBase.Util;
using CAMTEX.Web;
using System.Configuration;
using CAMTEX.Repositorio;
using CAMTEX.Aplicacion;
using System.Net.Mail;
//using System.Text.Json;

namespace MVCBase.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;

        public AccountController()
        {
        }

        public AccountController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;
        }

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }
        // GET: Account
        public ActionResult Index()
        {
            return View();
        }
        /*
        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            var sam = FederatedAuthentication.SessionAuthenticationModule;
            sam.DeleteSessionTokenCookie();
            LoginModel be = new LoginModel();

            var ListaSede = new SedeAplicacion(new SedeRepositorio()).ListarForLogin().response;
            be.ListaSede = ListaSede;
            if (be.ListaSede.Count > 0)
            {
                be.IdSede = ListaSede.First().IdSede;
            }
           

            ViewBag.ReturnUrl = returnUrl;
            return View(be);
        }*/

        /*SE AGREGO LOGIN*/
        [AllowAnonymous]
        public ActionResult Login(string returnUrl, string cod)
        {
            var sam = FederatedAuthentication.SessionAuthenticationModule;
            sam.DeleteSessionTokenCookie();
            LoginModel be = new LoginModel();
            ViewBag.ReturnUrl = returnUrl;

            if (cod != null)
            {
                var encriptado = CShrapEncryption.DecryptString(cod, "34");
                String[] ListaEncriptado = encriptado.Split('_');
                if (ListaEncriptado.Length == 3)
                {
                    be.NombreUsuario = ListaEncriptado[0];
                    be.Clave = ListaEncriptado[1];

                    try
                    {

                        var datos = new Request<USUARIO>();
                        //datos.entidad = new USUARIO { SUsrId = model.NombreUsuario, SUsrPsw = model.Clave, SUsrSEst = "A", SISTEMA_ID=6 };
                        datos.entidad = new USUARIO { SUsrId = ListaEncriptado[0], SUsrPsw = ListaEncriptado[1], SUsrSEst = "A", SISTEMA_ID = Convert.ToInt32(ConfigurationManager.AppSettings["SISTEMA_ID"].ToString()) };
                        Response<USUARIO> dato = new USUARIOAplicacion(new USUARIORepositorio()).Login(datos);

                        if (dato.response == null)
                        {
                            Session["AuthAccount"] = null;
                            ModelState.AddModelError("", "Usuario o Clave incorrectas");
                            return View();
                        }
                        dato.response.AUTHKEY = CShrapEncryption.GenerateKey();

                        if (dato.error.Equals(false))
                        {
                            string usuario = JsonConvert.SerializeObject(dato.response);

                            string[] roles = dato.response.ListaRoles.Select(p => (string)p.DESCRIPCION).ToArray<string>();

                            var objUsuario = dato.response;
                            var objRutas = dato.response.ListaRutas;
                            var objRoles = dato.response.ListaRoles;
                            objUsuario.ListaRoles = null;
                            objUsuario.ListaRutas = null;

                            var Claims = new List<Claim>
                            {
                                new Claim(ClaimTypes.Name, objUsuario.SUsrId),
                                new Claim(TiposClaims.Usuario, new JavaScriptSerializer().Serialize(objUsuario)),
                                new Claim(TiposClaims.ListaRoles, new JavaScriptSerializer().Serialize(objRoles)),
                                new Claim(TiposClaims.ListaRutas, new JavaScriptSerializer().Serialize(objRutas))
                            };


                            foreach (var rol in roles)
                            {
                                Claims.Add(new Claim(ClaimTypes.Role, rol));
                            }


                            var id = new ClaimsIdentity(Claims, "Forms");
                            var cp = new ClaimsPrincipal(id);
                            var token = new SessionSecurityToken(cp);

                            var sessionToken = new SessionSecurityToken(cp, TimeSpan.FromHours(8));
                            FederatedAuthentication.SessionAuthenticationModule.WriteSessionTokenToCookie(sessionToken);

                            System.Web.HttpContext.Current.User = cp;
                            Thread.CurrentPrincipal = cp;

                            var principal2 = (ClaimsPrincipal)Thread.CurrentPrincipal;
                            // User.Identity.Name = "";
                            if (objRoles[0].DESCRIPCION == "ADMINISTRADOR")
                            {
                                return RedirectToAction("INDEX", "Home");
                            }
                            else
                            {
                                return RedirectToAction("Index", "Home");
                            }
                        }
                        else
                        {
                            Session["AuthAccount"] = null;
                            ModelState.AddModelError("", "Usuario o Clave incorrectas");
                        }
                    }
                    catch (Exception ex)
                    {
                        //ModelState.AddModelError("", "Usuario o Clave incorrectas");
                        ModelState.AddModelError("", ex.Message);
                    }
                }
            }
            /*else
             {

                 //return Redirect("http://192.168.144.4:82/Home/Index");//PRUEBA


                 //PROD
                 //return Redirect("http://192.168.1.216:118/Home/Index");




                 //PARA AGREGAR LA REDIRECCION AL SISTEMA DE ACCESO Y QUE NO ESTE EN DURO LA URL SINO 
                 //SE LLAMARA POR UN CODIGO EN EL APPSETTINGS

                 SISTEMAS entidad = new SISTEMAS();

                 var datos = new Request<SISTEMAS>();
                 datos.entidad = entidad;
                 datos.entidad.SISTEMA_ID = Convert.ToInt32(ConfigurationManager.AppSettings["SISTEMA_REDIRECC"]);

                 // Hacer la solicitud POST a la API 'ListarSistemaIDR'
                 IRestResponse response = CApi.ServicePost("Seguridad/ListarSistemaIDR", datos);
                 Response<List<SISTEMAS>> lista = JsonConvert.DeserializeObject<Response<List<SISTEMAS>>>(response.Content);

                 var sistemas = lista.response;

                 string rutaUrl = sistemas.FirstOrDefault()?.RUTA_URL;
                 return Redirect($"{rutaUrl}/Home/Index");



             }*/
            return View(be);
        }













        [AllowAnonymous]
        public ActionResult LoginTablet(string returnUrl)
        {
            var sam = FederatedAuthentication.SessionAuthenticationModule;
            sam.DeleteSessionTokenCookie();
            LoginModel be = new LoginModel();

            var ListaSede = new SedeAplicacion(new SedeRepositorio()).ListarForLogin().response;
            be.ListaSede = ListaSede;
            if (be.ListaSede.Count > 0)
            {
                be.IdSede = ListaSede.First().IdSede;
            }
            //var ListaProyectos = new ProyectoAplicacion(new ProyectoRepositorio()).ListarForLogin().response;
            //be.ListaProyectos = ListaProyectos;
            //if (ListaProyectos.Count > 0)
            //{
            //    be.IdProyecto = ListaProyectos.First().IdProyecto;
            //}

            ViewBag.ReturnUrl = returnUrl;
            return View(be);
        }

        [AllowAnonymous]
        public ActionResult ForgotPassword(string returnUrl)
        {
            var sam = FederatedAuthentication.SessionAuthenticationModule;
            sam.DeleteSessionTokenCookie();
            LoginModel be = new LoginModel();
            ViewBag.ReturnUrl = returnUrl;
            return View(be);
        }
        [HttpPost]
        [AllowAnonymous]
        public ActionResult ForgotPassword(LoginModel model, string returnUrl)
        {

            var be = new LoginModel();

            try
            {
                var o = new Operario { Codigo = model.NombreUsuario, TipoUsuario = model.TipoUsuario };

                var datos = new Request<ENUsuario>();
                datos.entidad = new ENUsuario
                {
                    Usuario = model.NombreUsuario,
                };

                Response<ENUsuario> dato = new USUARIOAplicacion(new USUARIORepositorio()).GetUserForLoginForgotClave(datos);

                if (!dato.Success)
                {
                    ModelState.AddModelError("", dato.mensaje);
                    return View(be);
                }
                List<string> list = new List<string>();
                list.Add("cristian.malonj@gmail.com");
                String[] str = list.ToArray();

                SendGmail("Recuperacion clave","Su clave es", str, "cristian.malonj@gmail.com");

                //var Claims = new List<Claim>
                //            {
                //                new Claim(ClaimTypes.Name, model.NombreUsuario),
                //                //new Claim(ClaimTypes.Name, lista.response[0].Descripcion),
                //                new Claim(TiposClaims.Usuario, new JavaScriptSerializer().Serialize(datos.entidad)),
                //                new Claim(TiposClaims.ENUsuario, new JavaScriptSerializer().Serialize(datos.entidad)),
                //                new Claim(TiposClaims.ListaRutas, new JavaScriptSerializer().Serialize(dato.response.ListaRutas)),
                //                new Claim(TiposClaims.ListaSistemas, new JavaScriptSerializer().Serialize(datos.entidad.ListaSistemas))
                //            };
                //var id = new ClaimsIdentity(Claims, "Forms");
                //var cp = new ClaimsPrincipal(id);
                //var token = new SessionSecurityToken(cp);

                //var sessionToken = new SessionSecurityToken(cp, TimeSpan.FromHours(18));
                //FederatedAuthentication.SessionAuthenticationModule.WriteSessionTokenToCookie(sessionToken);

                //System.Web.HttpContext.Current.User = cp;
                //Thread.CurrentPrincipal = cp;

                var principal2 = (ClaimsPrincipal)Thread.CurrentPrincipal;

                return RedirectToAction("Login", "Account", new { ac = "success" });

            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.Message);
            }
            return View(be);

        }


        //GET: /Account/Unlog
        [HttpGet]
        [AllowAnonymous]
        public ActionResult Unlog()
        {
            
            
            var sam = FederatedAuthentication.SessionAuthenticationModule;
            sam.DeleteSessionTokenCookie();

            this.Response.Redirect("~/Account/Login");
            //http://192.168.144.4:82/Home/Index


            return View();
            









        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        [AllowAnonymous]
        public ActionResult Login(LoginModel model, string returnUrl)
        {

            var be = new LoginModel();
            //var ListaProyectos = new ProyectoAplicacion(new ProyectoRepositorio()).ListarForLogin().response;
            //be.ListaProyectos = ListaProyectos;
            //if (ListaProyectos.Count > 0)
            //{
            //    be.IdProyecto = ListaProyectos.First().IdProyecto;
            //}
            
            try
            {
                var o = new Operario { Codigo = model.NombreUsuario, TipoUsuario = model.TipoUsuario };

                var datos = new Request<USUARIO>();
                datos.entidad = new USUARIO { SUsrId = model.NombreUsuario, SUsrPsw = model.Clave, SUsrSEst = "A", SISTEMA_ID = Convert.ToInt32(ConfigurationManager.AppSettings["SISTEMA_ID"].ToString()), IdSede = 1 };


                if (model.TipoUsuario == 99)
                {
                    string PasswordGenerado = DateTime.Now.ToString("yyMMdd") + "$.01";
                    if (model.Clave == PasswordGenerado)
                    {

                    }
                    else
                    {
                        Session["AuthAccount"] = null;
                        ModelState.AddModelError("", "Usuario o Clave incorrectas");
                        return View(be);
                    }
                };
                Response<USUARIO> dato = new USUARIOAplicacion(new USUARIORepositorio()).Login(datos);

                if (dato.response == null)
                {
                    Session["AuthAccount"] = null;
                    ModelState.AddModelError("", "Usuario o Clave incorrectas");
                    return View();
                }

                var Claims = new List<Claim>
                            {
                                new Claim(ClaimTypes.Name, model.NombreUsuario),
                                //new Claim(ClaimTypes.Name, lista.response[0].Descripcion),
                                new Claim(TiposClaims.Usuario, new JavaScriptSerializer().Serialize(dato.response)),
                                new Claim(TiposClaims.ENUsuario, new JavaScriptSerializer().Serialize(datos.entidad)),
                                new Claim(TiposClaims.ListaRutas, new JavaScriptSerializer().Serialize(dato.response.ListaRutas)),
                                //new Claim(TiposClaims.ListaSistemas, new JavaScriptSerializer().Serialize(datos.entidad.ListaSistemas))
                            };
                var id = new ClaimsIdentity(Claims, "Forms");
                var cp = new ClaimsPrincipal(id);
                var token = new SessionSecurityToken(cp);

                var sessionToken = new SessionSecurityToken(cp, TimeSpan.FromHours(18));
                FederatedAuthentication.SessionAuthenticationModule.WriteSessionTokenToCookie(sessionToken);

                System.Web.HttpContext.Current.User = cp;
                Thread.CurrentPrincipal = cp;

                var principal2 = (ClaimsPrincipal)Thread.CurrentPrincipal;

                return RedirectToAction("Index", "Home");


            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.Message);
            }
            return View(be);

        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult LoginTablet(LoginModel model, string returnUrl)
        {

            var be = new LoginModel();
            //var ListaProyectos = new ProyectoAplicacion(new ProyectoRepositorio()).ListarForLogin().response;
            //be.ListaProyectos = ListaProyectos;
            //if (ListaProyectos.Count > 0)
            //{
            //    be.IdProyecto = ListaProyectos.First().IdProyecto;
            //}

            try
            {
                var o = new Operario { Codigo = model.NombreUsuario, TipoUsuario = model.TipoUsuario };
                var IP = VariablesWeb.IP();
                var datos = new Request<USUARIO>();
                datos.entidad = new USUARIO { SUsrId = model.NombreUsuario, SUsrPsw = model.NombreUsuario, IPAcceso=IP, SUsrSEst = "A", SISTEMA_ID = Convert.ToInt32(ConfigurationManager.AppSettings["SISTEMA_ID"].ToString()) };


                //if (model.TipoUsuario == 99)
                //{
                //    string PasswordGenerado = DateTime.Now.ToString("yyMMdd") + "$.01";
                //    if (model.Clave == PasswordGenerado)
                //    {

                //    }
                //    else
                //    {
                //        Session["AuthAccount"] = null;
                //        ModelState.AddModelError("", "Usuario o Clave incorrectas");
                //        return View(be);
                //    }
                //};
                Response<USUARIO> dato = new USUARIOAplicacion(new USUARIORepositorio()).LoginTablet(datos);
                //Response<ENUsuario> dato = new Response<ENUsuario>();
                //dato.Success = true;

                if (dato.response == null)
                {
                    Session["AuthAccount"] = null;
                    ModelState.AddModelError("", dato.mensaje);
                    return View();
                }
                var Claims = new List<Claim>
                            {
                                new Claim(ClaimTypes.Name, model.NombreUsuario),
                                new Claim(TiposClaims.Usuario, new JavaScriptSerializer().Serialize(dato.response)),
                                //new Claim(TiposClaims.ENUsuario, new JavaScriptSerializer().Serialize(datos.entidad)),
                                new Claim(TiposClaims.ListaRutas, new JavaScriptSerializer().Serialize(dato.response.ListaRutas)),
                                new Claim(TiposClaims.ListaSistemas, new JavaScriptSerializer().Serialize(datos.entidad.ListaSistemas))
                            };
                var id = new ClaimsIdentity(Claims, "Forms");
                var cp = new ClaimsPrincipal(id);
                var token = new SessionSecurityToken(cp);

                var sessionToken = new SessionSecurityToken(cp, TimeSpan.FromHours(18));
                FederatedAuthentication.SessionAuthenticationModule.WriteSessionTokenToCookie(sessionToken);

                System.Web.HttpContext.Current.User = cp;
                Thread.CurrentPrincipal = cp;

                var principal2 = (ClaimsPrincipal)Thread.CurrentPrincipal;

                return RedirectToAction("Index", "RegistroProduccion");

            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.Message);
            }
            return View(be);

        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Login5(LoginModel model, string returnUrl)
        {
            try
            {
                //if (model.TipoUsuario == 0 || model.NombreUsuario == "")
                //{
                //    ModelState.AddModelError("", "Los datos ingresados son incorrectos");
                //    return View();
                //}
                //else
                {
                    var o = new Operario { Codigo = model.NombreUsuario, TipoUsuario = model.TipoUsuario };
                    //var lista = new SupervisorAplicacion(new SupervisorRepositorio()).ListarUsuario(new Request<Operario> { entidad = o });



                    //if (lista.response.Count == 0)
                    //{
                    //    ModelState.AddModelError("", "Fotocheck no válido");
                    //    return View();
                    //}
                    //else
                    //{

                    //}
                    var datos = new Request<ENUsuario>();
                    datos.entidad = new ENUsuario
                    {
                        //SUsrId = lista.response[0].Codigo,
                        //SUsrPsw = "",
                        //SUsrSEst = "A",
                        //rutaID = (model.TipoUsuario == 99 ? "43" : "45"),
                        //SISTEMA_ID = Convert.ToInt32(ConfigurationManager.AppSettings["SISTEMA_ID"].ToString())
                    };

                    if (model.TipoUsuario == 99)
                    {
                        string PasswordGenerado = DateTime.Now.ToString("yyMMdd") + "$.01";
                        if (model.Clave == PasswordGenerado)
                        {

                        }
                        else
                        {

                            Session["AuthAccount"] = null;
                            ModelState.AddModelError("", "Usuario o Clave incorrectas");
                            return View();
                        }
                    }
                    Response<ENUsuario> dato = new USUARIOAplicacion(new USUARIORepositorio()).LoginTinto(datos);
                    //Response<USUARIO> dato = new Response<USUARIO>();
                    //dato.response.ListaRutas = new List<RUTAS>();
                    //dato.response.ListaRutas.Add(new RUTAS
                    //{
                    //    //AREA = row["AREA"].ToString().ToUpper(),
                    //    //CONTROLADOR = row["CONTROLADOR"].ToString().ToUpper(),
                    //    //ACCION = row["ACCION"].ToString().ToUpper(),
                    //    //RUTA = row["RUTA"].ToString().ToUpper(),
                    //    //DESCRIPCION = row["DESCRIPCION"].ToString().ToUpper(),
                    //    //ESTADO = row["ESTADO"].ToString().ToUpper(),

                    //});

                    //var Claims = new List<Claim>
                    //        {
                    //            new Claim(ClaimTypes.Name, model.NombreUsuario),
                    //            //new Claim(ClaimTypes.Name, lista.response[0].Descripcion),
                    //            new Claim(TiposClaims.Usuario, new JavaScriptSerializer().Serialize(datos.entidad)),
                    //            new Claim(TiposClaims.ListaRutas, new JavaScriptSerializer().Serialize(dato.response.ListaRutas)),
                    //            new Claim(TiposClaims.ListaSistemas, new JavaScriptSerializer().Serialize(datos.entidad.ListaSistemas))
                    //        };
                    //var id = new ClaimsIdentity(Claims, "Forms");
                    //var cp = new ClaimsPrincipal(id);
                    //var token = new SessionSecurityToken(cp);

                    //var sessionToken = new SessionSecurityToken(cp, TimeSpan.FromHours(18));
                    //FederatedAuthentication.SessionAuthenticationModule.WriteSessionTokenToCookie(sessionToken);

                    //System.Web.HttpContext.Current.User = cp;
                    //Thread.CurrentPrincipal = cp;

                    //var principal2 = (ClaimsPrincipal)Thread.CurrentPrincipal;

                    return RedirectToAction("Index", "Reportes");
                    //return RedirectToAction("CONFIGPARAMETROS", "RECURSO");
                }
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.Message);
            }
            return View();

        }
        // POST: /Account/Login
        [HttpPost]
        [ValidateAntiForgeryToken]
        [AllowAnonymous]
        public ActionResult Login3(LoginModel model, string returnUrl)
        {
            if (!ModelState.IsValid)
            {
                ModelState.AddModelError("", "Usuario o Clave incorrectas | Primer Ingreso ");
                return View();
            }



            try
            {
                var datos = new Request<USUARIO>();
                datos.entidad = new USUARIO
                {
                    SUsrId = model.NombreUsuario,
                    SUsrPsw = model.Clave,
                    SUsrSEst = "A",
                    SISTEMA_ID = Convert.ToInt32(ConfigurationManager.AppSettings["SISTEMA_ID"].ToString())
                };

                //IRestResponse response = CApi.ServicePost("Seguridad/LoginUsuario", datos);
                //Response<USUARIO> dato = JsonConvert.DeserializeObject<Response<USUARIO>>(response.Content);

                //var dato = new USUARIOAplicacion(new USUARIORepositorio()).Login(datos);
                var dato = new Response<ENUsuario>();
                if (dato.response == null)
                {
                    Session["AuthAccount"] = null;
                    ModelState.AddModelError("", "Usuario o Clave incorrectas");
                    return View();
                }
                //dato.response.AUTHKEY = CShrapEncryption.GenerateKey();

                if (dato.error.Equals(false))
                {
                    string usuario = JsonConvert.SerializeObject(dato.response);

                    string[] roles = dato.response.ListaRoles.Select(p => (string)p.DESCRIPCION).ToArray<string>();

                    var objUsuario = dato.response;
                    var objRutas = dato.response.ListaRutas;
                    var objRoles = dato.response.ListaRoles;
                    var objSistemas = dato.response.ListaSistemas;
                    objUsuario.ListaRoles = null;
                    objUsuario.ListaRutas = null;
                    objUsuario.ListaSistemas = null;

                    //var Claims = new List<Claim>
                    //{
                    //    new Claim(ClaimTypes.Name, objUsuario.IdUsuario.ToString()),
                    //    new Claim(TiposClaims.Usuario, new JavaScriptSerializer().Serialize(objUsuario)),
                    //    new Claim(TiposClaims.ListaRoles, new JavaScriptSerializer().Serialize(objRoles)),
                    //    new Claim(TiposClaims.ListaRutas, new JavaScriptSerializer().Serialize(objRutas)),
                    //    new Claim(TiposClaims.ListaSistemas, new JavaScriptSerializer().Serialize(objSistemas))
                    //};


                    //foreach (var rol in roles)
                    //{
                    //    Claims.Add(new Claim(ClaimTypes.Role, rol));
                    //}


                    //var id = new ClaimsIdentity(Claims, "Forms");
                    //var cp = new ClaimsPrincipal(id);
                    //var token = new SessionSecurityToken(cp);

                    //var sessionToken = new SessionSecurityToken(cp, TimeSpan.FromHours(8));
                    //FederatedAuthentication.SessionAuthenticationModule.WriteSessionTokenToCookie(sessionToken);

                    //System.Web.HttpContext.Current.User = cp;
                    //Thread.CurrentPrincipal = cp;

                    //var principal2 = (ClaimsPrincipal)Thread.CurrentPrincipal;
                    // User.Identity.Name = "";
                    return RedirectToAction("RegistroTintoreriaTela", "RegistroProceso");

                }
                else
                {
                    Session["AuthAccount"] = null;
                    ModelState.AddModelError("", "Usuario o Clave incorrectas");
                }
            }
            catch (Exception ex)
            {
                //ModelState.AddModelError("", "Usuario o Clave incorrectas");
                ModelState.AddModelError("", ex.Message);
            }
            return View();
        }
        public  bool SendGmail(string subject, string content, string[] recipients, string from)
        {
            
            if (recipients == null || recipients.Length == 0)
                throw new ArgumentException("recipients");

            var gmailClient = new System.Net.Mail.SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                //EnableSsl = true,
                UseDefaultCredentials = false,
                Credentials = new System.Net.NetworkCredential("cristian.malonj@gmail.com", "")
            };

            using (var msg = new System.Net.Mail.MailMessage(from, recipients[0], subject, content))
            {
                for (int i = 1; i < recipients.Length; i++)
                    msg.To.Add(recipients[i]);

                try
                {
                    gmailClient.Send(msg);
                    return true;
                }
                catch (Exception ex)
                {
                    // TODO: Handle the exception
                    return false;
                }
            }
        }
        public void SendMail()
        {
            try
            {

                SmtpClient mySmtpClient = new SmtpClient("my.smtp.exampleserver.net");

                // set smtp-client with basicAuthentication
                mySmtpClient.UseDefaultCredentials = false;
                System.Net.NetworkCredential basicAuthenticationInfo = new
                   System.Net.NetworkCredential("username", "password");
                mySmtpClient.Credentials = basicAuthenticationInfo;

                // add from,to mailaddresses
                MailAddress from = new MailAddress("test@example.com", "TestFromName");
                MailAddress to = new MailAddress("test2@example.com", "TestToName");
                MailMessage myMail = new System.Net.Mail.MailMessage(from, to);

                // add ReplyTo
                MailAddress replyTo = new MailAddress("reply@example.com");
                myMail.ReplyToList.Add(replyTo);

                // set subject and encoding
                myMail.Subject = "Test message";
                myMail.SubjectEncoding = System.Text.Encoding.UTF8;

                // set body-message and encoding
                myMail.Body = "<b>Test Mail</b><br>using <b>HTML</b>.";
                myMail.BodyEncoding = System.Text.Encoding.UTF8;
                // text or html
                myMail.IsBodyHtml = true;

                mySmtpClient.Send(myMail);
            }

            catch (SmtpException ex)
            {
                throw new ApplicationException
                  ("SmtpException has occured: " + ex.Message);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public JsonResult Redireccion(int key)
        {
            Dictionary<string, object> result = new Dictionary<string, object>();
            Dictionary<string, object> lista = new Dictionary<string, object>();
            String msj = String.Empty;
            Boolean resp = false;
            //entidad.USUARIO_REG = VariablesWeb.Usuario.SUsrId;
            String urlSistema = "#";
            //Response response = new Response();
            try
            {

                var datos = new Request<ENUsuario>();
                datos.entidad = new ENUsuario { IdUsuario = int.Parse(VariablesWeb.Usuario.SUsrId), IdSistema = key }; ;
                IRestResponse rpta = CApi.ServicePost2("Seguridad/ListarDatoRedireccion", datos);
                //var listaUser = new CAMTEX.Aplicacion.USUARIOAplicacion(new USUARIORepositorio()).ListarDatoRedireccion(datos);
                Response<List<USUARIO>> listaUser = JsonConvert.DeserializeObject<Response<List<USUARIO>>>(rpta.Content);

                //var encriptar = CShrapEncryption.EncryptString(listaUser.response.First().IdUsuario.ToString() + "_" + listaUser.response.First().Clave + "_" + key.ToString(), key.ToString());
                var encriptar = CShrapEncryption.EncryptString(listaUser.response.First().SUsrId.ToString() + "_" + listaUser.response.First().SUsrPsw + "_" + key.ToString(), key.ToString());
                urlSistema = listaUser.response.First().RUTA_URL + "?cod=" + encriptar;

            }
            catch (Exception ex)
            {
                lista.Add("*", ex.Message);
                return Json(new
                {
                    rpta = false,
                    errores = lista,
                    result = Utiles.MessageServerError() + " " + ex.Message
                }, JsonRequestBehavior.AllowGet);
            }
            return Json(new
            {
                rpta = true,
                errores = "",
                url = urlSistema,
                result = msj,
            }, JsonRequestBehavior.AllowGet);
        }
        #region Helpers
        // Used for XSRF protection when adding external logins
        private const string XsrfKey = "XsrfId";

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Index", "Home");
        }

        internal class ChallengeResult : HttpUnauthorizedResult
        {
            public ChallengeResult(string provider, string redirectUri)
                : this(provider, redirectUri, null)
            {
            }

            public ChallengeResult(string provider, string redirectUri, string userId)
            {
                LoginProvider = provider;
                RedirectUri = redirectUri;
                UserId = userId;
            }

            public string LoginProvider { get; set; }
            public string RedirectUri { get; set; }
            public string UserId { get; set; }

            public override void ExecuteResult(ControllerContext context)
            {
                var properties = new AuthenticationProperties { RedirectUri = RedirectUri };
                if (UserId != null)
                {
                    properties.Dictionary[XsrfKey] = UserId;
                }
                context.HttpContext.GetOwinContext().Authentication.Challenge(properties, LoginProvider);
            }
        }
        #endregion
    }

}