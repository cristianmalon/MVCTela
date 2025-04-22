using CAMTEX.Aplicacion.Base;
using CAMTEX.Aplicacion.Entidades;
using CAMTEX.Entidades;
using CAMTEX.Repositorio;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Aplicacion
{
    public class MaquinaAplicacion : IGeneralAplicacion<ENMaquina>
    {
        private MaquinaRepositorio MaquinaRepositorio;
        public MaquinaAplicacion(MaquinaRepositorio MaquinaRepositorio)
        {
            this.MaquinaRepositorio = MaquinaRepositorio;
        }

        public Response Actualizar(Request<ENMaquina> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = MaquinaRepositorio.Actualizar(entidad.entidad);
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

        public Response Eliminar(Request<ENMaquina> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = MaquinaRepositorio.Eliminar(entidad.entidad);
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

        public Response Insertar(Request<ENMaquina> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = MaquinaRepositorio.Insertar(entidad.entidad);
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

        public Response ActualizaUbicacion(Request<ENMaquina> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = MaquinaRepositorio.ActualizaUbicacion(entidad.entidad);
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

        public Response<List<ENMaquina>> Listar(Request<ENMaquina> entidad)
        {
            Response<List<ENMaquina>> retorno = new Response<List<ENMaquina>>();

            try
            {
                DataTable dt = MaquinaRepositorio.Listar(entidad.entidad);
                List<ENMaquina> lista = new List<ENMaquina>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENMaquina()
                    {
                        IdMaquina = Util.CapturaInt0(row, "IdMaquina"),
                        Maquina = Util.CapturaString(row, "Maquina"),
                        IdTmiB01 = Util.CapturaInt0(row, "IdTmiB01"),
                        IdTmiB02 = Util.CapturaInt0(row, "IdTmiB02"),

                        Item = Util.CapturaString(row, "Item"),
                        CodigoSap = Util.CapturaString(row, "CodigoSap"),
                        CentroCostos = Util.CapturaString(row, "CentroCostos"),
                        Marca = Util.CapturaString(row, "Marca"),
                        Modelo = Util.CapturaString(row, "Modelo"),
                        Serie = Util.CapturaString(row, "Serie"),
                        Familia = Util.CapturaString(row, "Familia"),
                        SubFamilia = Util.CapturaString(row, "SubFamilia"),
                        CentroCostosArea = Util.CapturaString(row, "CentroCostosArea"),
                        CentroCostosAreaDesc = Util.CapturaString(row, "CentroCostosAreaDesc"),
                        EstadoMaquina = Util.CapturaInt0(row, "EstadoMaquina"),
                        EstadoMaquinaDes = Util.CapturaString(row, "EstadoMaquinaDes"),
                        //TipoMaquina = Util.CapturaString(row, "TipoMaquina"),
                        USUARIO_REG = Util.CapturaString(row, "UsuarioReg"),
                        FECHA_REG = Util.CapturaDatetime(row, "FechaReg"),
                        ESTADO = Util.CapturaString(row, "Estado"),
                        TMIDDes = Util.CapturaString(row, "TMIDDes"),
                        //ESTADO_DES = Util.CapturaString(row, "Estado_Des"),

                        IdLinea = Util.CapturaIntNull(row, "IdLinea"),
                        IdUbicacion = Util.CapturaIntNull(row, "IdUbicacion"),
                        //Ubicacion = Util.CapturaString(row, "Ubicacion"),
                        //Linea = Util.CapturaString(row, "Linea"),


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

        public Response<List<ENMaquina>> ListarMaquinasActivas(Request<ENMaquina> entidad)
        {
            Response<List<ENMaquina>> retorno = new Response<List<ENMaquina>>();

            try
            {
                DataTable dt = MaquinaRepositorio.ListarMaquinasActivas(entidad.entidad);
                List<ENMaquina> lista = new List<ENMaquina>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENMaquina()
                    {
                        IdMaquina = Util.CapturaInt0(row, "IdPmqB01"),
                        Maquina= Util.CapturaString(row, "Marca"),
                        Marca = Util.CapturaString(row, "Marca"),
                        Modelo = Util.CapturaString(row, "Modelo"),
                        Serie = Util.CapturaString(row, "Serie"),
                        TipoMaquina = Util.CapturaString(row, "TipoMaquina"),
                        DetalleTipoMaquina = Util.CapturaString(row, "DetalleTipoMaquina"),
                       

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

        public Response<List<ENMaquina>> ListarPaginado(Request<ENMaquina> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<ENItemSAP>> ListarItemSAP()
        {
            Response<List<ENItemSAP>> retorno = new Response<List<ENItemSAP>>();

            try
            {
                DataTable dt = MaquinaRepositorio.ListarItemSAP();
                List<ENItemSAP> lista = new List<ENItemSAP>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENItemSAP()
                    {
                        ItemName = Util.CapturaString(row, "ItemName"),
                        CodigoSap = Util.CapturaString(row, "ItemCode"),
                        CentroCostos = Util.CapturaString(row, "CentroCosto"),
                        
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
