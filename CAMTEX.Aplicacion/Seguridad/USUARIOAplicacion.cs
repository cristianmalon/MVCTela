using CAMTEX.Aplicacion.Base;
using CAMTEX.Aplicacion.Entidades;
using CAMTEX.Entidades;
using CAMTEX.Repositorio;
using CAMTEX.UtilGeneral;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Aplicacion
{
    public class USUARIOAplicacion : IGeneralAplicacion<ENUsuario>
    {
        private USUARIORepositorio USUARIORepositorio;
        public USUARIOAplicacion(USUARIORepositorio USUARIORepositorio)
        {
            this.USUARIORepositorio = USUARIORepositorio;
        }

        public Response Actualizar(Request<ENUsuario> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Eliminar(Request<ENUsuario> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Insertar(Request<ENUsuario> entidad)
        {
            throw new NotImplementedException();
        }
        public Response UnlogTablet(Request<USUARIO> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = USUARIORepositorio.UnlogTablet(entidad.entidad);
                retorno.Success = true;
                retorno.error = false;

            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }


        public Response<List<ENUsuario>> Listar(Request<ENUsuario> entidad)
        {
            throw new NotImplementedException();

            //Response<List<ENUsuario>> retorno = new Response<List<ENUsuario>>();
            //try
            //{
            //    entidad.entidad.SUsrId = entidad.entidad.SerialKey == null ? String.Empty : entidad.entidad.SerialKey.Equals(string.Empty) ? String.Empty : CShrapEncryption.DecryptString(entidad.entidad.SerialKey, entidad.token);

            //    DataTable dt = USUARIORepositorio.Listar(entidad.entidad);
            //    List<ENUsuario> lista = new List<ENUsuario>();


            //    foreach (DataRow row in dt.Rows)
            //    {
            //        lista.Add(new USUARIO()
            //        {
            //            SUsrId = row["SUsrId"].ToString(), //NOMBRE DE USUARIO -ID USUARIO
            //            SUsrDsc = row["SUsrDsc"].ToString(), //NOMBRES COMPLETOS
            //            SUsrPsw = row["SUsrPsw"].ToString(), //CONTRASEÑA
            //            SUsrDEma = row["SUsrDEma"].ToString() == String.Empty ? "-" : row["SUsrDEma"].ToString(), //E-MAIL
            //            SUsrSEst = row["SUsrSEst"].ToString(), //ESTADO
            //            SUsrFLgCr1 = row["SUsrFLgCr1"].ToString() == String.Empty ? (DateTime?)null : Convert.ToDateTime(row["SUsrFLgCr1"].ToString()), //FECHA REGISTRO
            //            SerialKey = CShrapEncryption.EncryptString(row["SUsrId"].ToString(), entidad.token)
            //        });
            //    }

            //    retorno.error = false;
            //    retorno.response = lista;
            //}
            //catch (Exception ex)
            //{
            //    retorno.error = true;
            //    retorno.mensaje = ex.Message;
            //}

            //return retorno;
        }

        public Response<List<ENUsuario>> ListarPaginado(Request<ENUsuario> entidad)
        {
            throw new NotImplementedException();

            //Response<List<ENUsuario>> retorno = new Response<List<ENUsuario>>();
            //try
            //{
            //    entidad.entidad.SUsrId = entidad.entidad.SerialKey == null ? String.Empty : entidad.entidad.SerialKey.Equals(string.Empty) ? String.Empty : CShrapEncryption.DecryptString(entidad.entidad.SerialKey, entidad.token);

            //    DataTable dt = USUARIORepositorio.ListarPaginado(entidad.entidad);
            //    List<ENUsuario> lista = new List<ENUsuario>();
            //    foreach (DataRow row in dt.Rows)
            //    {
            //        lista.Add(new USUARIO()
            //        {
            //            SUsrId = row["SUsrId"].ToString(), //NOMBRE DE USUARIO -ID USUARIO
            //            SUsrDsc = row["SUsrDsc"].ToString(), //NOMBRES COMPLETOS
            //            SUsrPsw = row["SUsrPsw"].ToString(), //CONTRASEÑA
            //            SUsrDEma = row["SUsrDEma"].ToString() == String.Empty ? "-" : row["SUsrDEma"].ToString(), //E-MAIL
            //            SUsrFLgCr1 = row["SUsrFLgCr1"].ToString() == String.Empty ? (DateTime?)null : Convert.ToDateTime(row["SUsrFLgCr1"].ToString()), //FECHA REGISTRO
            //            SUsrSEst = row["SUsrSEst"].ToString().Equals("I") ? "INACTIVO" : "ACTIVO", //ESTADO
            //            SerialKey = CShrapEncryption.EncryptString(row["SUsrId"].ToString(), entidad.token),
            //            TotalPage = Convert.ToInt32(row["TotalReg"].ToString())
            //        });
            //    }

            //    retorno.error = false;
            //    retorno.response = lista;
            //}
            //catch (Exception ex)
            //{
            //    retorno.error = true;
            //    retorno.mensaje = ex.Message;
            //}

            //return retorno;
        }

        public Response<USUARIO> Login(Request<USUARIO> entidad)
        {
           // throw new NotImplementedException();
            Response<USUARIO> retorno = new Response<USUARIO>();
            try
            {
                String key = CShrapEncryption.GenerateKey();
                DataTable dt = USUARIORepositorio.Login(entidad.entidad);
                USUARIO usuario = null;
                foreach (DataRow row in dt.Rows)
                {
                    usuario = new USUARIO()
                    {
                        SUsrId = row["SUsrId"].ToString(),
                        SUsrDsc = row["SUsrDsc"].ToString(),
                        SUsrPsw = row["SUsrPsw"].ToString(),
                        SUsrSEst = row["SUsrSEst"].ToString(),
                        EmpCCod = row["EmpCCod"].ToString(),
                        EmpCCodUs = row["EmpCCod"].ToString(),
                        SerialKey = key
                    };
                }

                if (usuario != null)
                {
                    USUARIO_ROLESRepositorio USUARIO_ROLESRepositorio = new USUARIO_ROLESRepositorio();
                    USUARIO_ROLES usuario_roles = new USUARIO_ROLES();

                    usuario_roles.MUSUCONST = usuario.SUsrId;
                    usuario_roles.ESTADO = "A";
                    usuario_roles.SISTEMA_ID = entidad.entidad.SISTEMA_ID;

                    DataTable dt_ur = USUARIO_ROLESRepositorio.ListarActivos(usuario_roles);
                    List<ROLES> listaroles = new List<ROLES>();

                    foreach (DataRow row in dt_ur.Rows)
                    {
                        listaroles.Add(new ROLES()
                        {
                            DESCRIPCION = row["DESCRIPCION_ROL"].ToString().ToUpper(),
                            ESTADO = row["ESTADO_ROL"].ToString().ToUpper(),
                            SISTEMAKey = CShrapEncryption.EncryptString(row["SISTEMA_ID_ROL"].ToString(), key),
                            SerialKey = CShrapEncryption.EncryptString(row["ROLES_ID"].ToString(), key)
                        });
                    }

                    if (listaroles != null && listaroles.Count > 0)
                    {
                        RUTASRepositorio RUTASRepositorio = new RUTASRepositorio();
                        RUTAS ruta = new RUTAS();
                        List<RUTAS> listarutas = new List<RUTAS>();
                        string RolesIdSplit = string.Empty;

                        foreach (DataRow row in dt_ur.Rows)
                        {
                            RolesIdSplit += row["ROLES_ID"].ToString() + ",";
                        }

                        ruta.RUTA = RolesIdSplit.Remove(RolesIdSplit.Length - 1);
                        ruta.ESTADO = "A";

                        DataTable dt_rutas = RUTASRepositorio.ListaRutas(ruta);

                        foreach (DataRow row in dt_rutas.Rows)
                        {
                            listarutas.Add(new RUTAS()
                            {
                                AREA = row["AREA"].ToString().ToUpper(),
                                CONTROLADOR = row["CONTROLADOR"].ToString().ToUpper(),
                                ACCION = row["ACCION"].ToString().ToUpper(),
                                RUTA = row["RUTA"].ToString().ToUpper(),
                                DESCRIPCION = row["DESCRIPCION"].ToString().ToUpper(),
                                ESTADO = row["ESTADO"].ToString().ToUpper(),
                                RUTAS_TIPOKey = CShrapEncryption.EncryptString(row["RUTAS_TIPO_ID"].ToString(), key),
                                RUTAS_PADREKey = Convert.ToInt64(row["RUTAS_PADRE_ID"].ToString()) == 0 ? "" : CShrapEncryption.EncryptString(row["RUTAS_PADRE_ID"].ToString(), key),
                                SISTEMAKey = CShrapEncryption.EncryptString(row["SISTEMA_ID"].ToString(), key),
                                SerialKey = CShrapEncryption.EncryptString(row["RUTAS_ID"].ToString(), key)
                            });
                        }

                        usuario.ListaRutas = listarutas;
                    }

                    usuario.ListaRoles = listaroles;

                    //SISTEMASRepositorio SistemaRepositorio = new SISTEMASRepositorio();
                    //SISTEMAS BE = new SISTEMAS();
                    //BE.SUsrId = usuario.SUsrId;
                    //DataTable dt_sistema = SistemaRepositorio.ListarSistemasUsuario(BE);

                    //List<SISTEMAS> listaSistemas = new List<SISTEMAS>();
                    //foreach (DataRow row in dt_sistema.Rows)
                    //{
                    //    listaSistemas.Add(new SISTEMAS()
                    //    {
                    //        SISTEMA_ID = Convert.ToInt32(row["SISTEMA_ID"].ToString()),
                    //        DESCRIPCION = row["DESCRIPCION"].ToString().ToUpper(),
                    //        RUTA_URL = row["RUTA_URL"] != DBNull.Value ? row["RUTA_URL"].ToString() : string.Empty,
                    //        ICONO = row["ICONO"] != DBNull.Value ? row["ICONO"].ToString() : string.Empty,
                    //        COLOR = row["COLOR"] != DBNull.Value ? row["COLOR"].ToString() : string.Empty,
                    //    });
                    //}
                    //usuario.ListaSistemas = listaSistemas;
                }

                //usuario.SUsrId = String.Empty;
                retorno.error = false;
                retorno.response = usuario;
            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }

            return retorno;
        }
        public Response<USUARIO> LoginTablet(Request<USUARIO> entidad)
        {
            // throw new NotImplementedException();
            Response<USUARIO> retorno = new Response<USUARIO>();
            try
            {
                String key = CShrapEncryption.GenerateKey();
                DataTable dt = USUARIORepositorio.LoginTablet(entidad.entidad);
                USUARIO usuario = null;
                foreach (DataRow row in dt.Rows)
                {
                    usuario = new USUARIO()
                    {
                        SUsrId = row["Eplccod"].ToString(),
                        SUsrDsc = row["Epldnom"].ToString(),
                        EplDNom = row["Epldnom"].ToString(),
                        SUsrSEst = row["FunSEst"].ToString(),
                        SerialKey = key,
                        IPAcceso=row["IPAcceso"].ToString(),
                    };
                }

                //usuario.SUsrId = String.Empty;
                retorno.error = false;
                retorno.response = usuario;
            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }

            return retorno;
        }
        public Response<List<USUARIO>> LoginTablet_admin(Request<USUARIO> entidad)
        {
            Response<List<USUARIO>> retorno = new Response<List<USUARIO>>();
            try
            {
                String key = CShrapEncryption.GenerateKey();
                DataTable dt = USUARIORepositorio.LoginTablet_admin(entidad.entidad);
                //USUARIO usuario = null;
                List<USUARIO> lista = new List<USUARIO>();
                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new USUARIO()
                    {
                        SUsrId = row["Eplccod"].ToString(),
                        SUsrDsc = row["Epldnom"].ToString(),
                        SUsrSEst = row["FunSEst"].ToString(),
                        SerialKey = key,
                        IPAcceso = row["IPAcceso"].ToString(),
                        FunDDes = row["FunDDes"].ToString(),
                    });
                }

                //usuario.SUsrId = String.Empty;
                retorno.error = false;
                retorno.response = lista;
            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }

            return retorno;
        }
        public Response<ENUsuario> LoginTinto(Request<ENUsuario> entidad)
        {
            throw new NotImplementedException();
            //Response<ENUsuario> retorno = new Response<ENUsuario>();
            //try
            //{
            //    String key = CShrapEncryption.GenerateKey();
            //    //DataTable dt = USUARIORepositorio.Login(entidad.entidad);
            //    USUARIO usuario = entidad.entidad;



            //    RUTASRepositorio RUTASRepositorio = new RUTASRepositorio();
            //    RUTAS ruta = new RUTAS();
            //    List<RUTAS> listarutas = new List<RUTAS>();

            //    ruta.RUTA = entidad.entidad.rutaID;
            //    ruta.ESTADO = "A";

            //    DataTable dt_rutas = RUTASRepositorio.ListaRutas(ruta);

            //    foreach (DataRow row in dt_rutas.Rows)
            //    {
            //        listarutas.Add(new RUTAS()
            //        {
            //            AREA = row["AREA"].ToString().ToUpper(),
            //            CONTROLADOR = row["CONTROLADOR"].ToString().ToUpper(),
            //            ACCION = row["ACCION"].ToString().ToUpper(),
            //            RUTA = row["RUTA"].ToString().ToUpper(),
            //            DESCRIPCION = row["DESCRIPCION"].ToString().ToUpper(),
            //            ESTADO = row["ESTADO"].ToString().ToUpper(),
            //            RUTAS_TIPOKey = CShrapEncryption.EncryptString(row["RUTAS_TIPO_ID"].ToString(), key),
            //            RUTAS_PADREKey = Convert.ToInt64(row["RUTAS_PADRE_ID"].ToString()) == 0 ? "" : CShrapEncryption.EncryptString(row["RUTAS_PADRE_ID"].ToString(), key),
            //            SISTEMAKey = CShrapEncryption.EncryptString(row["SISTEMA_ID"].ToString(), key),
            //            SerialKey = CShrapEncryption.EncryptString(row["RUTAS_ID"].ToString(), key)
            //        });
            //    }

            //    usuario.ListaRutas = listarutas;


            //    retorno.error = false;
            //    retorno.response = usuario;
            //}
            //catch (Exception ex)
            //{
            //    retorno.error = true;
            //    retorno.mensaje = ex.Message;
            //}

            //return retorno;
        }
        public Response<ENUsuario> GetUserForLogin(Request<ENUsuario> entidad)
        {
            Response<ENUsuario> retorno = new Response<ENUsuario>();

            try
            {
                String key = CShrapEncryption.GenerateKey();
                DataTable dt = USUARIORepositorio.GetUserForLogin(entidad.entidad);
                //List<ENUsuario> lista = new List<ENUsuario>();
                var usuario = new ENUsuario();
                foreach (DataRow row in dt.Rows)
                {
                    usuario = new ENUsuario()
                    {
                        SUsrId = Util.CapturaString(row, "SUsrId"),
                        Usuario = Util.CapturaString(row, "SUsrDsc"),
                        EmpCCod = Util.CapturaString(row, "EmpCCod"),
                      
                    };
                    retorno.Success = true;
                }
                if (usuario != null)
                {
                    USUARIO_ROLESRepositorio USUARIO_ROLESRepositorio = new USUARIO_ROLESRepositorio();
                    USUARIO_ROLES usuario_roles = new USUARIO_ROLES();

                    usuario_roles.MUSUCONST = usuario.SUsrId;
                    usuario_roles.ESTADO = "A";
                    usuario_roles.SISTEMA_ID = entidad.entidad.SISTEMA_ID;

                    DataTable dt_ur = USUARIO_ROLESRepositorio.ListarActivos(usuario_roles);
                    List<ROLES> listaroles = new List<ROLES>();

                    foreach (DataRow row in dt_ur.Rows)
                    {
                        listaroles.Add(new ROLES()
                        {
                            DESCRIPCION = row["DESCRIPCION_ROL"].ToString().ToUpper(),
                            ESTADO = row["ESTADO_ROL"].ToString().ToUpper(),
                            SISTEMAKey = CShrapEncryption.EncryptString(row["SISTEMA_ID_ROL"].ToString(), key),
                            SerialKey = CShrapEncryption.EncryptString(row["ROLES_ID"].ToString(), key)
                        });
                    }
                }

                    retorno.response = usuario;
            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }
        public Response<ENUsuario> GetUserForLoginForgotClave(Request<ENUsuario> entidad)
        {
            Response<ENUsuario> retorno = new Response<ENUsuario>();

            try
            {
                DataTable dt = USUARIORepositorio.GetUserForLoginForgotClave(entidad.entidad);
                //List<ENUsuario> lista = new List<ENUsuario>();
                var ee = new ENUsuario();
                foreach (DataRow row in dt.Rows)
                {
                    ee = new ENUsuario()
                    {
                        IdUsuario = Util.CapturaInt0(row, "IdUsuario"),
                        Usuario = Util.CapturaString(row, "Usuario"),
                        Email = Util.CapturaString(row, "Email"),
                    };
                    retorno.Success = true;
                }


                retorno.response = ee;
            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }
        
        public Response<List<ENUsuario>> GetUser(Request<ENUsuario> entidad)
        {

            throw new NotImplementedException();
            //Response<List<ENUsuario>> retorno = new Response<List<ENUsuario>>();
            //try
            //{
            //    DataTable dt = USUARIORepositorio.GetUser(entidad.entidad);
            //    List<ENUsuario> lista = new List<ENUsuario>();

            //    foreach (DataRow row in dt.Rows)
            //    {
            //        lista.Add(new USUARIO()
            //        {
            //            EmpCCodUs = row["EmpCCodUs"].ToString(),
            //            EplCCodUs = row["EplCCodUs"].ToString() == string.Empty ? (int?)null : Convert.ToInt32(row["EplCCodUs"].ToString()),
            //            SUsrDsc = row["SUsrDsc"].ToString(),
            //            EmpCCod = row["EmpCCodUs"].ToString(),

            //        });
            //    }

            //    retorno.error = false;
            //    retorno.response = lista;
            //}
            //catch (Exception ex)
            //{
            //    retorno.error = true;
            //    retorno.mensaje = ex.Message;
            //}

            //return retorno;
        }

        public Response<List<ENUsuario>> ListarEmpleado(Request<ENUsuario> entidad)
        {
            throw new NotImplementedException();
            //Response<List<ENUsuario>> retorno = new Response<List<ENUsuario>>();
            //try
            //{
            //    DataTable dt = USUARIORepositorio.ListarEmpleado(entidad.entidad);
            //    List<ENUsuario> lista = new List<ENUsuario>();

            //    foreach (DataRow row in dt.Rows)
            //    {
            //        lista.Add(new USUARIO()
            //        {
            //            SUsrDEma = row["SUsrDEma"] != DBNull.Value ? row["SUsrDEma"].ToString() : string.Empty,
            //            EplDNom = row["EplDNom"] != DBNull.Value ? row["EplDNom"].ToString() : string.Empty,
            //            EplDCgo = row["EplDCgo"] != DBNull.Value ? row["EplDCgo"].ToString() : string.Empty,
            //            EplDAre = row["EplDAre"] != DBNull.Value ? row["EplDAre"].ToString() : string.Empty,
            //            EplNTel1r = row["EplNTel1r"] != DBNull.Value ? row["EplNTel1r"].ToString() : string.Empty,
            //            SUsrId = row["SUsrId"] != DBNull.Value ? row["SUsrId"].ToString() : string.Empty,
            //        });
            //    }

            //    retorno.error = false;
            //    retorno.response = lista;
            //}
            //catch (Exception ex)
            //{
            //    retorno.error = true;
            //    retorno.mensaje = ex.Message;
            //}

            //return retorno;
        }

        public Response<List<ENUsuario>> ListarDatoRedireccion(Request<ENUsuario> entidad)
        {
            throw new NotImplementedException();
            //Response<List<ENUsuario>> retorno = new Response<List<ENUsuario>>();
            //try
            //{
            //    DataTable dt = USUARIORepositorio.ListarDatoRedireccion(entidad.entidad);
            //    List<ENUsuario> lista = new List<ENUsuario>();

            //    foreach (DataRow row in dt.Rows)
            //    {
            //        lista.Add(new USUARIO()
            //        {
            //            SUsrId = row["SUsrId"].ToString(),
            //            SUsrPsw = row["SUsrPsw"].ToString(),
            //            RUTA_URL = row["RUTA_URL"].ToString(),

            //        });
            //    }

            //    retorno.error = false;
            //    retorno.response = lista;
            //}
            //catch (Exception ex)
            //{
            //    retorno.error = true;
            //    retorno.mensaje = ex.Message;
            //}

            //return retorno;
        }
    }
}
