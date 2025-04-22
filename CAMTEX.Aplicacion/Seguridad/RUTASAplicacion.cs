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
    public class RUTASAplicacion : IGeneralAplicacion<RUTAS>
    {
        private RUTASRepositorio RUTASRepositorio;
        public RUTASAplicacion(RUTASRepositorio RUTASRepositorio)
        {
            this.RUTASRepositorio = RUTASRepositorio;
        }

        public Response Actualizar(Request<RUTAS> entidad)
        {
            entidad.entidad.RUTAS_ID = entidad.entidad.SerialKey == null ? 0 : entidad.entidad.SerialKey.Equals(string.Empty) ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.SerialKey, entidad.token));
            entidad.entidad.RUTAS_TIPO_ID = entidad.entidad.RUTAS_TIPOKey == null ? 0 : entidad.entidad.RUTAS_TIPOKey.Equals(string.Empty) ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.RUTAS_TIPOKey, entidad.token));
            entidad.entidad.SISTEMA_ID = entidad.entidad.SISTEMAKey == null ? 0 : entidad.entidad.SISTEMAKey.Equals(string.Empty) ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.SISTEMAKey, entidad.token));
            entidad.entidad.RUTAS_PADRE_ID = entidad.entidad.RUTAS_PADREKey == null ? 0 : entidad.entidad.RUTAS_PADREKey.Equals(string.Empty) ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.RUTAS_PADREKey, entidad.token));

            entidad.entidad.FECHA_ACT = DateTime.Now;

            Response retorno = new Response();
            try
            {
                var resultado = RUTASRepositorio.Actualizar(entidad.entidad);
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

        public Response Eliminar(Request<RUTAS> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Insertar(Request<RUTAS> entidad)
        {
            Response retorno = new Response();
            try
            {
                entidad.entidad.SISTEMA_ID = Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.SISTEMAKey, entidad.token));
                entidad.entidad.RUTAS_TIPO_ID = Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.RUTAS_TIPOKey, entidad.token));
                entidad.entidad.RUTAS_PADRE_ID = Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.RUTAS_PADREKey, entidad.token));
                var resultado = RUTASRepositorio.Insertar(entidad.entidad);
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

        public Response<List<RUTAS>> Listar(Request<RUTAS> entidad)
        {
            Response<List<RUTAS>> retorno = new Response<List<RUTAS>>();
            try
            {
                entidad.entidad.RUTAS_ID = entidad.entidad.SerialKey == null ? 0 : entidad.entidad.SerialKey.Equals(string.Empty) ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.SerialKey, entidad.token));

                DataTable dt = RUTASRepositorio.Listar(entidad.entidad);
                List<RUTAS> lista = new List<RUTAS>();


                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new RUTAS()
                    {
                        ESTADO = row["ESTADO"].ToString(),
                        AREA = row["AREA"].ToString(),
                        CONTROLADOR = row["CONTROLADOR"].ToString(),
                        ACCION = row["ACCION"].ToString(),
                        RUTA = row["RUTA"].ToString(),
                        DESCRIPCION = row["DESCRIPCION"].ToString(),
                        SerialKey = CShrapEncryption.EncryptString(row["RUTAS_ID"].ToString(), entidad.token),
                        SISTEMAKey = CShrapEncryption.EncryptString(row["SISTEMA_ID"].ToString(), entidad.token),
                        RUTAS_TIPOKey = CShrapEncryption.EncryptString(row["RUTAS_TIPO_ID"].ToString(), entidad.token),
                        RUTAS_PADREKey = CShrapEncryption.EncryptString(row["RUTAS_PADRE_ID"].ToString(), entidad.token),
                    });
                }

                lista.Add(new RUTAS() { DESCRIPCION = "NINGUNO", SerialKey = CShrapEncryption.EncryptString("0", entidad.token) });

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

        public Response<List<RUTAS>> Listar_RutaPadreSistema(Request<RUTAS> entidad)
        {
            Response<List<RUTAS>> retorno = new Response<List<RUTAS>>();
            try
            { 
                entidad.entidad.SISTEMA_ID = entidad.entidad.SISTEMAKey == null ? 0 : entidad.entidad.SISTEMAKey.Equals(string.Empty) ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.SISTEMAKey, entidad.token));
                entidad.entidad.RUTAS_ID = entidad.entidad.SerialKey == null ? 0 : entidad.entidad.SerialKey.Equals(string.Empty) ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.SerialKey, entidad.token));

                DataTable dt = RUTASRepositorio.Listar_RutaPadreSistema(entidad.entidad);
                List<RUTAS> lista = new List<RUTAS>();


                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new RUTAS()
                    {
                        ESTADO = row["ESTADO"].ToString(),
                        AREA = row["AREA"].ToString(),
                        CONTROLADOR = row["CONTROLADOR"].ToString(),
                        ACCION = row["ACCION"].ToString(),
                        RUTA = row["RUTA"].ToString(),
                        DESCRIPCION = row["DESCRIPCION"].ToString(),
                        SerialKey = CShrapEncryption.EncryptString(row["RUTAS_ID"].ToString(), entidad.token),
                        SISTEMAKey = CShrapEncryption.EncryptString(row["SISTEMA_ID"].ToString(), entidad.token),
                        RUTAS_TIPOKey = CShrapEncryption.EncryptString(row["RUTAS_TIPO_ID"].ToString(), entidad.token),
                        RUTAS_PADREKey = CShrapEncryption.EncryptString(row["RUTAS_PADRE_ID"].ToString(), entidad.token),
                    });
                }

                lista.Add(new RUTAS() { DESCRIPCION = "NINGUNO", SerialKey = CShrapEncryption.EncryptString("0", entidad.token) });

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

        public Response<List<RUTAS>> ListarPaginado(Request<RUTAS> entidad)
        {
            Response<List<RUTAS>> retorno = new Response<List<RUTAS>>();
            try
            {
                entidad.entidad.RUTAS_ID = entidad.entidad.SerialKey == null ? 0 : entidad.entidad.SerialKey.Equals(string.Empty) ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.SerialKey, entidad.token));
                entidad.entidad.SISTEMA_ID = entidad.entidad.SISTEMAKey == null ? 0 : entidad.entidad.SISTEMAKey.Equals(string.Empty) ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.SISTEMAKey, entidad.token));
                entidad.entidad.RUTAS_TIPO_ID = entidad.entidad.RUTAS_TIPOKey == null ? 0 : entidad.entidad.RUTAS_TIPOKey.Equals(string.Empty) ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.RUTAS_TIPOKey, entidad.token));

                DataTable dt = RUTASRepositorio.ListarPaginado(entidad.entidad);
                List<RUTAS> lista = new List<RUTAS>();
                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new RUTAS()
                    {
                        ESTADO = row["ESTADO"].ToString().Equals("I") ? "INACTIVO" : "ACTIVO",
                        AREA = row["AREA"].ToString(),
                        CONTROLADOR = row["CONTROLADOR"].ToString(),
                        ACCION = row["ACCION"].ToString(),
                        RUTA = row["RUTA"].ToString(),
                        DESCRIPCION = row["DESCRIPCION"].ToString(),
                        DESCRIPCION_CORTA_SIS = row["DESCRIPCION_CORTA_SIS"].ToString(),
                        DESCRIPCION_RUTA_TIPO = row["DESCRIPCION_RUTA_TIPO"].ToString(),
                        TotalPage = Convert.ToInt32(row["TotalReg"].ToString()),
                        SerialKey = CShrapEncryption.EncryptString(row["RUTAS_ID"].ToString(), entidad.token),
                        SISTEMAKey = CShrapEncryption.EncryptString(row["SISTEMA_ID"].ToString(), entidad.token),
                        RUTAS_TIPOKey = CShrapEncryption.EncryptString(row["RUTAS_TIPO_ID"].ToString(), entidad.token)
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

    }
}
