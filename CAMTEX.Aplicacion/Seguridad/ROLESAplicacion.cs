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
    public class ROLESAplicacion : IGeneralAplicacion<ROLES>
    {
        private ROLESRepositorio ROLESRepositorio;
        public ROLESAplicacion(ROLESRepositorio ROLESRepositorio)
        {
            this.ROLESRepositorio = ROLESRepositorio;
        }

        public Response Actualizar(Request<ROLES> entidad)
        {
            entidad.entidad.ROLES_ID = entidad.entidad.SerialKey == null ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.SerialKey, entidad.token));
            entidad.entidad.SISTEMA_ID = entidad.entidad.SISTEMAKey == null ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.SISTEMAKey, entidad.token));

            Response retorno = new Response();
            try
            {
                var resultado = ROLESRepositorio.Actualizar(entidad.entidad);
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

        public Response Eliminar(Request<ROLES> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Insertar(Request<ROLES> entidad)
        {
            Response retorno = new Response();
            try
            {
                entidad.entidad.SISTEMA_ID = Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.SISTEMAKey, entidad.token));
                var resultado = ROLESRepositorio.Insertar(entidad.entidad);
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

        public Response<List<ROLES>> Listar(Request<ROLES> entidad)
        {
            Response<List<ROLES>> retorno = new Response<List<ROLES>>();
            try
            {
                entidad.entidad.ROLES_ID = entidad.entidad.SerialKey == null ? 0 : entidad.entidad.SerialKey.Equals(string.Empty) ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.SerialKey, entidad.token));
                entidad.entidad.SISTEMA_ID = entidad.entidad.SISTEMAKey == null ? 0 : entidad.entidad.SISTEMAKey.Equals(string.Empty) ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.SISTEMAKey, entidad.token));

                DataTable dt = ROLESRepositorio.Listar(entidad.entidad);
                List<ROLES> lista = new List<ROLES>();
                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ROLES()
                    {
                        ESTADO = row["ESTADO"].ToString(),
                        DESCRIPCION = row["DESCRIPCION"].ToString(),
                        DESCRIPCION_CORTA_SIS = row["DESCRIPCION_CORTA_SIS"].ToString(),
                        SerialKey = CShrapEncryption.EncryptString(row["ROLES_ID"].ToString(), entidad.token),
                        SISTEMAKey = CShrapEncryption.EncryptString(row["SISTEMA_ID"].ToString(), entidad.token),
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

        public Response<List<ROLES>> ListarPaginado(Request<ROLES> entidad)
        {
            Response<List<ROLES>> retorno = new Response<List<ROLES>>();
            try
            {
                entidad.entidad.ROLES_ID = entidad.entidad.SerialKey == null ? 0 : entidad.entidad.SerialKey.Equals(string.Empty) ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.SerialKey, entidad.token));
                entidad.entidad.SISTEMA_ID = entidad.entidad.SISTEMAKey == null ? 0 : entidad.entidad.SISTEMAKey.Equals(string.Empty) ? 0 : Convert.ToInt64(CShrapEncryption.DecryptString(entidad.entidad.SISTEMAKey, entidad.token));

                DataTable dt = ROLESRepositorio.ListarPaginado(entidad.entidad);
                List<ROLES> lista = new List<ROLES>();
                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ROLES()
                    {
                        ESTADO = row["ESTADO"].ToString().Equals("I") ? "INACTIVO" : "ACTIVO",
                        DESCRIPCION = row["DESCRIPCION"].ToString(),
                        DESCRIPCION_CORTA_SIS = row["DESCRIPCION_CORTA_SIS"].ToString(),
                        TotalPage = Convert.ToInt32(row["TotalReg"].ToString()),
                        SerialKey = CShrapEncryption.EncryptString(row["ROLES_ID"].ToString(), entidad.token),
                        SISTEMAKey = CShrapEncryption.EncryptString(row["SISTEMA_ID"].ToString(), entidad.token),
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
