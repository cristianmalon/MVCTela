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
    public class CuerdaAplicacion : IGeneralAplicacion<Cuerda>
    {
        private CuerdaRepositorio CuerdaRepositorio;

        public CuerdaAplicacion(CuerdaRepositorio CuerdaRepositorio)
        {
            this.CuerdaRepositorio = CuerdaRepositorio;
        }
        public Response Actualizar(Request<Cuerda> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Eliminar(Request<Cuerda> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Insertar(Request<Cuerda> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<Cuerda>> Listar(Request<Cuerda> entidad)
        {
            Response<List<Cuerda>> retorno = new Response<List<Cuerda>>();

            try
            {
                DataTable dt = CuerdaRepositorio.Listar(entidad.entidad);
                List<Cuerda> lista = new List<Cuerda>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new Cuerda()
                    {
                        EmpCCod = row["EmpCCod"] != DBNull.Value ? row["EmpCCod"].ToString() : string.Empty,
                        OFaCTDc = row["OFaCTDc"] != DBNull.Value ? row["OFaCTDc"].ToString() : string.Empty,
                        OFaNAno = int.Parse(row["OFaNAno"].ToString()),
                        OFaNNro = row["OFaNNro"] != DBNull.Value ? row["OFaNNro"].ToString() : string.Empty,
                        OfaNroCuer = row["OfaNroCuer"] != DBNull.Value ? row["OfaNroCuer"].ToString() : string.Empty,
                        OFACueStckI = row["OFACueStckI"] != DBNull.Value ? row["OFACueStckI"].ToString() : string.Empty,
                        OFACuePar = row["OFACuePar"] != DBNull.Value ? row["OFACuePar"].ToString() : string.Empty,

                        Rollos = int.Parse(row["Rollos"].ToString()),
                        Peso = decimal.Parse(row["Peso"].ToString()),

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

        public Response<List<Cuerda>> ListarPaginado(Request<Cuerda> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<OF>> ListarDatosOF(Request<Cuerda> entidad)
        {
            Response<List<OF>> retorno = new Response<List<OF>>();

            try
            {
                DataTable dt = CuerdaRepositorio.ListarDatosOF(entidad.entidad);
                List<OF> lista = new List<OF>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new OF()
                    {
                        EmpCCod = row["EmpCCod"] != DBNull.Value ? row["EmpCCod"].ToString() : string.Empty,
                        OFaCTDc = row["OFaCTDc"] != DBNull.Value ? row["OFaCTDc"].ToString() : string.Empty,
                        OFaNAno = int.Parse(row["OFaNAno"].ToString()),
                        OFaNNro = row["OFaNNro"] != DBNull.Value ? row["OFaNNro"].ToString() : string.Empty,

                        Partida = row["Partida"] != DBNull.Value ? row["Partida"].ToString() : string.Empty,
                        Cliente = row["Cliente"] != DBNull.Value ? row["Cliente"].ToString() : string.Empty,
                        PedidoTextilAnio = int.Parse(row["PedidoTextilAnio"].ToString()),
                        PedidoTextilNro = row["PedidoTextilNro"] != DBNull.Value ? row["PedidoTextilNro"].ToString() : string.Empty,
                        ColorCodigo = row["ColorCodigo"] != DBNull.Value ? row["ColorCodigo"].ToString() : string.Empty,
                        Color = row["Color"] != DBNull.Value ? row["Color"].ToString() : string.Empty,
                        TelaCodigo = row["TelaCodigo"] != DBNull.Value ? row["TelaCodigo"].ToString() : string.Empty,
                        Tela = row["Tela"] != DBNull.Value ? row["Tela"].ToString() : string.Empty,
                        TipoTenido = row["TipoTenido"] != DBNull.Value ? row["TipoTenido"].ToString() : string.Empty,
                        Reproceso= row["Reproceso"] != DBNull.Value ? row["Reproceso"].ToString() : string.Empty,
                        MaquinaProgramada = row["MaquinaProgramada"] != DBNull.Value ? row["MaquinaProgramada"].ToString() : string.Empty,

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
        public Response<RegProd> OFAbierta(Request<Cuerda> entidad)
        {
            Response<RegProd> retorno = new Response<RegProd>();
            //OFaCTDc OFaNAno OFaNNro IsAbierta   CodSupervisor CodOperario
            try
            {
                DataTable dt = CuerdaRepositorio.OFAbierta(entidad.entidad);
                RegProd lista = new RegProd();

                foreach (DataRow row in dt.Rows)
                {
                    lista = new RegProd()
                    {
                        OFaCTDc = row["OFaCTDc"] != DBNull.Value ? row["OFaCTDc"].ToString() : string.Empty,

                        OFaNAno = int.Parse(row["OFaNAno"].ToString()),
                        OFaNNro = row["OFaNNro"] != DBNull.Value ? row["OFaNNro"].ToString() : string.Empty,

                        IsAbierta = int.Parse(row["IsAbierta"].ToString()),

                        CodSupervisor = row["CodSupervisor"] != DBNull.Value ? row["CodSupervisor"].ToString() : string.Empty,
                        CodOperario = row["CodOperario"] != DBNull.Value ? row["CodOperario"].ToString() : string.Empty,

                        Supervisor = row["Supervisor"] != DBNull.Value ? row["Supervisor"].ToString() : string.Empty,
                        Operario = row["Operario"] != DBNull.Value ? row["Operario"].ToString() : string.Empty,

                        Ayudante = row["Ayudante"] != DBNull.Value ? row["Ayudante"].ToString() : string.Empty,
                        CodAyudante = row["CodAyudante"] != DBNull.Value ? row["CodAyudante"].ToString() : string.Empty,

                        MinutosParada = Convert.ToInt32(row["MinutosParada"].ToString()),
                        TiempoTeorico = row["TiempoTeorico"] != DBNull.Value ? row["TiempoTeorico"].ToString() : string.Empty,
                        FechaInicio= row["FechaInicio"] != DBNull.Value ? row["FechaInicio"].ToString() : string.Empty,
                        Observacion= row["Observacion"] != DBNull.Value ? row["Observacion"].ToString() : string.Empty,

                    };
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
