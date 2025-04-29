using CAMTEX.Aplicacion.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CAMTEX.Aplicacion.Entidades;
using CAMTEX.Entidades;
using CAMTEX.Repositorio;
using System.Data;
using CAMTEX.UtilGeneral;

namespace CAMTEX.Aplicacion
{
    public class RUTAS_TIPOAplicacion : IGeneralAplicacion<RUTAS_TIPO>
    {
        private RUTAS_TIPORepositorio RUTAS_TIPORepositorio;
        public RUTAS_TIPOAplicacion(RUTAS_TIPORepositorio RUTAS_TIPORepositorio)
        {
            this.RUTAS_TIPORepositorio = RUTAS_TIPORepositorio;
        }

        public Response Actualizar(Request<RUTAS_TIPO> entidad)
        {
            entidad.entidad.RUTAS_TIPO_ID = entidad.entidad.SerialKey == null ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.SerialKey, entidad.token));
            entidad.entidad.FECHA_ACT = DateTime.Now;

            Response retorno = new Response();
            try
            {
                var resultado = RUTAS_TIPORepositorio.Actualizar(entidad.entidad);
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

        public Response Eliminar(Request<RUTAS_TIPO> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Insertar(Request<RUTAS_TIPO> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = RUTAS_TIPORepositorio.Insertar(entidad.entidad);
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

        public Response<List<RUTAS_TIPO>> Listar(Request<RUTAS_TIPO> entidad)
        {
            Response<List<RUTAS_TIPO>> retorno = new Response<List<RUTAS_TIPO>>();
            try
            {
                entidad.entidad.RUTAS_TIPO_ID = entidad.entidad.SerialKey == null ? 0 : entidad.entidad.SerialKey.Equals(string.Empty) ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.SerialKey, entidad.token));

                DataTable dt = RUTAS_TIPORepositorio.Listar(entidad.entidad);
                List<RUTAS_TIPO> lista = new List<RUTAS_TIPO>();
                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new RUTAS_TIPO()
                    {
                        ESTADO = row["ESTADO"].ToString(),
                        DESCRIPCION = row["DESCRIPCION"].ToString(),
                        SerialKey = CShrapEncryption.EncryptString(row["RUTAS_TIPO_ID"].ToString(), entidad.token),
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

        public Response<List<RUTAS_TIPO>> ListarPaginado(Request<RUTAS_TIPO> entidad)
        {
            Response<List<RUTAS_TIPO>> retorno = new Response<List<RUTAS_TIPO>>();
            try
            {
                //entidad.entidad.RUTAS_TIPO_ID = Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.SerialKey, entidad.token));

                DataTable dt = RUTAS_TIPORepositorio.ListarPaginado(entidad.entidad);
                List<RUTAS_TIPO> lista = new List<RUTAS_TIPO>();
                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new RUTAS_TIPO()
                    {
                        ESTADO = row["ESTADO"].ToString().Equals("I") ? "INACTIVO" : "ACTIVO",
                        DESCRIPCION = row["DESCRIPCION"].ToString(),
                        TotalPage = Convert.ToInt32(row["TotalReg"].ToString()),
                        SerialKey = CShrapEncryption.EncryptString(row["RUTAS_TIPO_ID"].ToString(), entidad.token),
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
