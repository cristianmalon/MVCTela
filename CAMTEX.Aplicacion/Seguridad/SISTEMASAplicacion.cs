using CAMTEX.Aplicacion.Base;
using CAMTEX.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CAMTEX.Aplicacion.Entidades;
using CAMTEX.Repositorio;
using System.Data;
using CAMTEX.UtilGeneral;

namespace CAMTEX.Aplicacion
{
    public class SISTEMASAplicacion : IGeneralAplicacion<SISTEMAS>
    {
        private SISTEMASRepositorio SISTEMASRepositorio;

        public SISTEMASAplicacion(SISTEMASRepositorio SISTEMASRepositorio)
        {
            this.SISTEMASRepositorio = SISTEMASRepositorio;
        }

        public Response Actualizar(Request<SISTEMAS> entidad)
        {
            entidad.entidad.SISTEMA_ID = entidad.entidad.SISTEMAKey == null ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.SISTEMAKey, entidad.token));

            Response retorno = new Response();
            try
            {
                var resultado = SISTEMASRepositorio.Actualizar(entidad.entidad);
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

        public Response Eliminar(Request<SISTEMAS> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Insertar(Request<SISTEMAS> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = SISTEMASRepositorio.Insertar(entidad.entidad);
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

        public Response<List<SISTEMAS>> Listar(Request<SISTEMAS> entidad)
        {
            Response<List<SISTEMAS>> retorno = new Response<List<SISTEMAS>>();
            try
            {

                DataTable dt = SISTEMASRepositorio.Listar(entidad.entidad);
                List<SISTEMAS> lista = new List<SISTEMAS>();
                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new SISTEMAS()
                    {
                        DESCRIPCION = row["DESCRIPCION"].ToString(),
                        DESCRIPCION_CORTA = row["DESCRIPCION_CORTA"].ToString(),
                        RUTA_URL = row["RUTA_URL"].ToString(),
                        ICONO = row["ICONO"].ToString(),
                        COLOR = row["COLOR"].ToString(),
                        SerialKey = CShrapEncryption.EncryptString(row["SISTEMA_ID"].ToString(), entidad.token)
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

        public Response<List<SISTEMAS>> ListarPaginado(Request<SISTEMAS> entidad)
        {
            Response<List<SISTEMAS>> retorno = new Response<List<SISTEMAS>>();
            try
            {

                DataTable dt = SISTEMASRepositorio.ListarPaginado(entidad.entidad);
                List<SISTEMAS> lista = new List<SISTEMAS>();
                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new SISTEMAS()
                    {
                        DESCRIPCION = row["DESCRIPCION"].ToString(),
                        DESCRIPCION_CORTA = row["DESCRIPCION_CORTA"].ToString(),
                        RUTA_URL = row["RUTA_URL"] != DBNull.Value ? row["RUTA_URL"].ToString() : string.Empty,
                        ICONO = row["ICONO"] != DBNull.Value ? row["ICONO"].ToString() : string.Empty,
                        COLOR = row["COLOR"] != DBNull.Value ? row["COLOR"].ToString() : string.Empty,
                        SerialKey = CShrapEncryption.EncryptString(row["SISTEMA_ID"].ToString(), entidad.token)
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
        public Response<List<SISTEMAS>> ListarSistema(Request<SISTEMAS> entidad)
        {
            Response<List<SISTEMAS>> retorno = new Response<List<SISTEMAS>>();
            try
            {
                entidad.entidad.SISTEMA_ID = entidad.entidad.SISTEMAKey == null ? 0 : entidad.entidad.SISTEMAKey.Equals(string.Empty) ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.SISTEMAKey, entidad.token));

                DataTable dt = SISTEMASRepositorio.ListarSistema(entidad.entidad);
                List<SISTEMAS> lista = new List<SISTEMAS>();
                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new SISTEMAS()
                    {
                        DESCRIPCION = row["DESCRIPCION"].ToString(),
                        DESCRIPCION_CORTA = row["DESCRIPCION_CORTA"].ToString(),
                        RUTA_URL = row["RUTA_URL"].ToString(),
                        ICONO = row["ICONO"].ToString(),
                        COLOR = row["COLOR"].ToString(),
                        SerialKey = CShrapEncryption.EncryptString(row["SISTEMA_ID"].ToString(), entidad.token)
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
