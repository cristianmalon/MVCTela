using CAMTEX.Aplicacion.Base;
using CAMTEX.Aplicacion.Entidades;
using CAMTEX.Entidades;
using CAMTEX.Repositorio;
using CAMTEX.UtilGeneral;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Aplicacion
{
    public class ROLES_RUTASAplicacion : IGeneralAplicacion<ROLES_RUTAS>
    {
        private ROLES_RUTASRepositorio ROLES_RUTASRepositorio;
        public ROLES_RUTASAplicacion(ROLES_RUTASRepositorio ROLES_RUTASRepositorio)
        {
            this.ROLES_RUTASRepositorio = ROLES_RUTASRepositorio;
        }

        public Response Actualizar(Request<ROLES_RUTAS> entidad)
        {
            entidad.entidad.ROLES_ID = entidad.entidad.ROLESKey == null ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.ROLESKey, entidad.token));
            entidad.entidad.RUTAS_ID = entidad.entidad.RUTASKey == null ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.RUTASKey, entidad.token));

            Response retorno = new Response();
            try
            {
                var resultado = ROLES_RUTASRepositorio.Actualizar(entidad.entidad);
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

        public Response Eliminar(Request<ROLES_RUTAS> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Insertar(Request<ROLES_RUTAS> entidad)
        {
            Response retorno = new Response();
            try
            {
                entidad.entidad.ROLES_ID = Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.ROLESKey, entidad.token));
                entidad.entidad.RUTAS_ID = Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.RUTASKey, entidad.token));
                var resultado = ROLES_RUTASRepositorio.Insertar(entidad.entidad);
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

        public Response<List<ROLES_RUTAS>> Listar(Request<ROLES_RUTAS> entidad)
        {
            Response<List<ROLES_RUTAS>> retorno = new Response<List<ROLES_RUTAS>>();
            try
            {
                entidad.entidad.RUTAS_ID = entidad.entidad.RUTASKey == null ? 0 : entidad.entidad.RUTASKey.Equals(string.Empty) ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.RUTASKey, entidad.token));
                entidad.entidad.ROLES_ID = entidad.entidad.ROLESKey == null ? 0 : entidad.entidad.ROLESKey.Equals(string.Empty) ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.ROLESKey, entidad.token));

                DataTable dt = ROLES_RUTASRepositorio.Listar(entidad.entidad);
                List<ROLES_RUTAS> lista = new List<ROLES_RUTAS>();
                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ROLES_RUTAS()
                    {
                        ESTADO = row["ESTADO"].ToString(),
                        DESCRIPCION_ROL = row["DESCRIPCION_ROL"].ToString(),
                        DESCRIPCION_RUTA = row["DESCRIPCION_RUTA"].ToString(),
                        RUTASKey = CShrapEncryption.EncryptString(row["RUTAS_ID"].ToString(), entidad.token),
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

        public Response<List<ROLES_RUTAS>> ListarPaginado(Request<ROLES_RUTAS> entidad)
        {
            Response<List<ROLES_RUTAS>> retorno = new Response<List<ROLES_RUTAS>>();
            try
            {
                entidad.entidad.RUTAS_ID = entidad.entidad.RUTASKey == null ? 0 : entidad.entidad.RUTASKey.Equals(string.Empty) ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.RUTASKey, entidad.token));
                entidad.entidad.ROLES_ID = entidad.entidad.ROLESKey == null ? 0 : entidad.entidad.ROLESKey.Equals(string.Empty) ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.ROLESKey, entidad.token));

                DataTable dt = ROLES_RUTASRepositorio.ListarPaginado(entidad.entidad);
                List<ROLES_RUTAS> lista = new List<ROLES_RUTAS>();
                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ROLES_RUTAS()
                    {
                        ESTADO = row["ESTADO"].ToString().Equals("I") ? "INACTIVO" : "ACTIVO",
                        DESCRIPCION_ROL = row["DESCRIPCION_ROL"].ToString(),
                        DESCRIPCION_RUTA = row["DESCRIPCION_RUTA"].ToString(),
                        TotalPage = Convert.ToInt32(row["TotalReg"].ToString()),
                        RUTASKey = CShrapEncryption.EncryptString(row["RUTAS_ID"].ToString(), entidad.token),
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

        public Response DesactivarRutas(Request<ROLES_RUTAS> entidad)
        {
            entidad.entidad.ROLES_ID = entidad.entidad.ROLESKey == null ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.ROLESKey, entidad.token));
            entidad.entidad.RUTAS_ID = entidad.entidad.RUTASKey == null ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.RUTASKey, entidad.token));

            Response retorno = new Response();
            try
            {
                var resultado = ROLES_RUTASRepositorio.DesactivarRutas(entidad.entidad);
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
