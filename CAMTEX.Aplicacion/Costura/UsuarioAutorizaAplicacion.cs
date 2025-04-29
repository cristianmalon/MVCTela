using CAMTEX.Aplicacion.Base;
using CAMTEX.Aplicacion.Entidades;
using CAMTEX.Entidades;
using CAMTEX.Repositorio;
using System;
using System.Collections.Generic;
using System.Data;


namespace CAMTEX.Aplicacion
{
    public class UsuarioAutorizaAplicacion : IGeneralAplicacion<ENUsuario>
    {
        private UsuarioAutorizaRepositorio UsuarioAutorizaRepositorio;
        public UsuarioAutorizaAplicacion(UsuarioAutorizaRepositorio UsuarioAutorizaRepositorio)
        {
            this.UsuarioAutorizaRepositorio = UsuarioAutorizaRepositorio;
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

        public Response<List<ENUsuario>> Listar(Request<ENUsuario> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<ENUsuario>> ListarAutPCPM(Request<ENUsuario> entidad)
        {
            Response<List<ENUsuario>> retorno = new Response<List<ENUsuario>>();

            try
            {
                DataTable dt = UsuarioAutorizaRepositorio.ListarAutPCPM(entidad.entidad);
                List<ENUsuario> lista = new List<ENUsuario>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENUsuario()
                    {
                        IdTrabajador = Util.CapturaInt0(row, "EPLCCOD"),
                        Nombres = Util.CapturaString(row, "EPLDNOM"),
                        Cargo = Util.CapturaString(row, "Cargo"),
                        
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


        public Response<List<ENUsuario>> ListarPaginado(Request<ENUsuario> entidad)
        {
            throw new NotImplementedException();
        }
    }
}
