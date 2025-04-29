using CAMTEX.Aplicacion.Base;
using System;
using System.Collections.Generic;
using CAMTEX.Aplicacion.Entidades;
using CAMTEX.Repositorio;
using System.Data;
using CAMTEX.Entidades;
using CAMTEX.UtilGeneral;

namespace CAMTEX.Aplicacion
{
    public class USUARIO_ROLESAplicacion : IGeneralAplicacion<USUARIO_ROLES>
    {
        private USUARIO_ROLESRepositorio USUARIO_ROLESRepositorio;
        public USUARIO_ROLESAplicacion(USUARIO_ROLESRepositorio USUARIO_ROLESRepositorio)
        {
            this.USUARIO_ROLESRepositorio = USUARIO_ROLESRepositorio;
        }

        public Response Actualizar(Request<USUARIO_ROLES> entidad)
        {
            entidad.entidad.MUSUCONST = entidad.entidad.USUARIOKey == null ? null : CShrapEncryption.DecryptString(entidad.entidad.USUARIOKey, entidad.token);
            entidad.entidad.ROLES_ID = entidad.entidad.ROLESKey == null ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.ROLESKey, entidad.token));

            Response retorno = new Response();
            try
            {
                var resultado = USUARIO_ROLESRepositorio.Actualizar(entidad.entidad);
                retorno.error = false;
                retorno.mensaje = "Resultado OK";
            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }

        public Response Eliminar(Request<USUARIO_ROLES> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Insertar(Request<USUARIO_ROLES> entidad)
        {
            Response retorno = new Response();
            try
            {
                entidad.entidad.MUSUCONST = CShrapEncryption.DecryptString(entidad.entidad.USUARIOKey, entidad.token);
                entidad.entidad.ROLES_ID = Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.ROLESKey, entidad.token));
                var resultado = USUARIO_ROLESRepositorio.Insertar(entidad.entidad);
                retorno.error = false;
                retorno.mensaje = "Resultado OK";
            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }

        public Response<List<USUARIO_ROLES>> Listar(Request<USUARIO_ROLES> entidad)
        {
            Response<List<USUARIO_ROLES>> retorno = new Response<List<USUARIO_ROLES>>();
            try
            {
                entidad.entidad.MUSUCONST = entidad.entidad.USUARIOKey == null ? null : entidad.entidad.USUARIOKey.Equals(string.Empty) ? null : CShrapEncryption.DecryptString(entidad.entidad.USUARIOKey, entidad.token);
                entidad.entidad.ROLES_ID = entidad.entidad.ROLESKey == null ? 0 : entidad.entidad.ROLESKey.Equals(string.Empty) ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.ROLESKey, entidad.token));

                DataTable dt = USUARIO_ROLESRepositorio.Listar(entidad.entidad);
                List<USUARIO_ROLES> lista = new List<USUARIO_ROLES>();
                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new USUARIO_ROLES()
                    {
                        ESTADO = row["ESTADO"].ToString(),
                        DESCRIPCION_USUARIO = row["DESCRIPCION_USUARIO"].ToString(),
                        DESCRIPCION_ROL = row["DESCRIPCION_ROL"].ToString(),
                        USUARIOKey = CShrapEncryption.EncryptString(row["MUSUCONST"].ToString(), entidad.token),
                        ROLESKey = CShrapEncryption.EncryptString(row["ROLES_ID"].ToString(), entidad.token)
                    });
                }

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

        public Response<List<USUARIO_ROLES>> ListarPaginado(Request<USUARIO_ROLES> entidad)
        {
            Response<List<USUARIO_ROLES>> retorno = new Response<List<USUARIO_ROLES>>();
            try
            {
                entidad.entidad.MUSUCONST = entidad.entidad.USUARIOKey == null ? null : entidad.entidad.USUARIOKey.Equals(string.Empty) ? null : CShrapEncryption.DecryptString(entidad.entidad.USUARIOKey, entidad.token);
                entidad.entidad.ROLES_ID = entidad.entidad.ROLESKey == null ? 0 : entidad.entidad.ROLESKey.Equals(string.Empty) ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.ROLESKey, entidad.token));

                DataTable dt = USUARIO_ROLESRepositorio.ListarPaginado(entidad.entidad);
                List<USUARIO_ROLES> lista = new List<USUARIO_ROLES>();
                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new USUARIO_ROLES()
                    {
                        ESTADO = row["ESTADO"].ToString().Equals("I") ? "INACTIVO" : "ACTIVO",
                        DESCRIPCION_USUARIO = row["DESCRIPCION_USUARIO"].ToString(),
                        DESCRIPCION_ROL = row["DESCRIPCION_ROL"].ToString(),
                        TotalPage = Convert.ToInt32(row["TotalReg"].ToString()),
                        USUARIOKey = CShrapEncryption.EncryptString(row["MUSUCONST"].ToString(), entidad.token),
                        ROLESKey = CShrapEncryption.EncryptString(row["ROLES_ID"].ToString(), entidad.token)
                    });
                }

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

        public Response<List<USUARIO_ROLES>> ListarRolesSistema_Usuario(Request<USUARIO_ROLES> entidad)
        {
            Response<List<USUARIO_ROLES>> retorno = new Response<List<USUARIO_ROLES>>();
            try
            {
                entidad.entidad.MUSUCONST = entidad.entidad.USUARIOKey == null ? null : entidad.entidad.USUARIOKey.Equals(string.Empty) ? null : CShrapEncryption.DecryptString(entidad.entidad.USUARIOKey, entidad.token);
                entidad.entidad.ROLES_ID = entidad.entidad.ROLESKey == null ? 0 : entidad.entidad.ROLESKey.Equals(string.Empty) ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.ROLESKey, entidad.token));
                entidad.entidad.SISTEMA_ID = entidad.entidad.SISTEMAKey == null ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.SISTEMAKey, entidad.token));

                DataTable dt = USUARIO_ROLESRepositorio.ListarRolesSistema_Usuario(entidad.entidad);
                List<USUARIO_ROLES> lista = new List<USUARIO_ROLES>();
                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new USUARIO_ROLES()
                    {
                        ESTADO = row["ESTADO"].ToString().Equals("I") ? "INACTIVO" : "ACTIVO",
                        DESCRIPCION_USUARIO = row["DESCRIPCION_USUARIO"].ToString(),
                        DESCRIPCION_ROL = row["DESCRIPCION_ROL"].ToString(),
                        DesSistema = row["DesSistema"].ToString(),
                        //TotalPage = Convert.ToInt32(row["TotalReg"].ToString()),
                        EstadoUser = row["EstadoUser"].ToString().Equals("1")?true:false,
                        USUARIOKey = CShrapEncryption.EncryptString(row["MUSUCONST"].ToString(), entidad.token),
                        ROLESKey = CShrapEncryption.EncryptString(row["ROLES_ID"].ToString(), entidad.token)
                    });
                }

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

        public Response DesactivarRoles(Request<USUARIO_ROLES> entidad)
        {
            entidad.entidad.MUSUCONST = entidad.entidad.USUARIOKey == null ? null : CShrapEncryption.DecryptString(entidad.entidad.USUARIOKey, entidad.token);
            entidad.entidad.ROLES_ID = entidad.entidad.ROLESKey == null ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.ROLESKey, entidad.token));
            entidad.entidad.SISTEMA_ID = entidad.entidad.SISTEMAKey == null ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.SISTEMAKey, entidad.token));
            Response retorno = new Response();
            try
            {
                var resultado = USUARIO_ROLESRepositorio.DesactivarRoles(entidad.entidad);
                retorno.error = false;
                retorno.mensaje = "Resultado OK";
            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }

    }
}
