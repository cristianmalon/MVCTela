using CAMTEX.Aplicacion.Base;
using CAMTEX.Aplicacion.Entidades;
using CAMTEX.Entidades;
using CAMTEX.Repositorio;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Aplicacion
{
    public class EmpresaAplicacion : IGeneralAplicacion<ENEmpresa>
    {
        private EmpresaRepositorio EmpresaRepositorio;
        public EmpresaAplicacion(EmpresaRepositorio EmpresaRepositorio)
        {
            this.EmpresaRepositorio = EmpresaRepositorio;
        }
        public Response Actualizar(Request<ENEmpresa> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = EmpresaRepositorio.Actualizar(entidad.entidad);
                retorno.Success = true;
                //retorno.output = resultado["IdTrabajador"].ToString();
                retorno.error = false;

            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }

        public Response Eliminar(Request<ENEmpresa> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = EmpresaRepositorio.Eliminar(entidad.entidad);
                retorno.Success = true;
                //retorno.output = resultado["IdTrabajador"].ToString();
                retorno.error = false;

            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }

        public Response Insertar(Request<ENEmpresa> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = EmpresaRepositorio.Insertar(entidad.entidad);
                retorno.Success = true;
                //retorno.output = resultado["IdTrabajador"].ToString();
                retorno.error = false;

            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }

        public Response<List<ENEmpresa>> Listar(Request<ENEmpresa> entidad)
        {
            Response<List<ENEmpresa>> retorno = new Response<List<ENEmpresa>>();

            try
            {
                DataTable dt = EmpresaRepositorio.Listar(entidad.entidad);
                List<ENEmpresa> lista = new List<ENEmpresa>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENEmpresa()
                    {
                        IdEmpresa = Util.CapturaInt0(row, "IdEmpresa"),
                        Empresa = Util.CapturaString(row, "Empresa"),
                        ESTADO = Util.CapturaString(row, "Estado"),
                        ESTADO_DES = Util.CapturaString(row, "Estado_Des"),
                        USUARIO_REG = Util.CapturaString(row, "UsuarioReg"),
                        FECHA_REG = Util.CapturaDatetime(row, "FechaReg"),

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

        public Response<List<ENEmpresa>> ListarPaginado(Request<ENEmpresa> entidad)
        {
            throw new NotImplementedException();
        }
    }
}
