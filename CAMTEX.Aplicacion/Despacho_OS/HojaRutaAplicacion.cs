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
    public class HojaRutaAplicacion : IGeneralAplicacion<E_HojaRutacontrol>
    {
        private HojaRutaControlRepositorio HojaRutaControlRepositorio;
        public HojaRutaAplicacion( HojaRutaControlRepositorio HojaRutaControlRepositorio ) {
            this.HojaRutaControlRepositorio = HojaRutaControlRepositorio;
        }

        public Response Actualizar( Request<E_HojaRutacontrol> entidad ) {
            throw new NotImplementedException();
        }

        public Response Eliminar( Request<E_HojaRutacontrol> entidad ) {
            throw new NotImplementedException();
        }

        public Response Insertar( Request<E_HojaRutacontrol> entidad ) {
            Response retorno = new Response();
            try {
                var resultado = HojaRutaControlRepositorio.Insertar( entidad.entidad );
                retorno.Success = true;
                retorno.output = resultado["HRCID"].ToString();
            }
            catch ( Exception ex ) {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }

        public Response<List<E_HojaRutacontrol>> Listar( Request<E_HojaRutacontrol> entidad ) {
            Response<List<E_HojaRutacontrol>> retorno = new Response<List<E_HojaRutacontrol>>();

            try {
                DataTable dt = HojaRutaControlRepositorio.Listar( entidad.entidad );
                List<E_HojaRutacontrol> lista = new List<E_HojaRutacontrol>();

                foreach ( DataRow row in dt.Rows ) {
                    lista.Add( new E_HojaRutacontrol() {
                        HRCID = Convert.ToInt32( row["HRCID"].ToString() ),
                        HRCTraCCod = row["HRCTraCCod"] != DBNull.Value ? row["HRCTraCCod"].ToString() : string.Empty,
                        HRCTransportista = row["TraDDes"] != DBNull.Value ? row["TraDDes"].ToString() : string.Empty,
                        HRCMTC = row["HRCMTC"] != DBNull.Value ? row["HRCMTC"].ToString() : string.Empty,
                        HRCLicencia = row["HRCLicencia"] != DBNull.Value ? row["HRCLicencia"].ToString() : string.Empty,
                        HRCPlaca = row["HRCPlaca"] != DBNull.Value ? row["HRCPlaca"].ToString() : string.Empty,
                        HRCFecha = Convert.ToDateTime( row["HRCFecha"].ToString() ),
                        HRCCargaCombustible = Convert.ToDecimal( row["HRCCargaCombustible"].ToString() ),
                        HRCQGLNS = Convert.ToDecimal( row["HRCQGLNS"].ToString() ),
                        HRCCosto = Convert.ToDecimal( row["HRCCosto"].ToString() ),
                        HRCQVueltas = Convert.ToDecimal( row["HRCQVueltas"].ToString() ),
                        HRCKmInicial = Convert.ToDecimal( row["HRCKmInicial"].ToString() ),
                        HRCHoraSalida = row["HRCHoraSalida"] != DBNull.Value ? row["HRCHoraSalida"].ToString() : string.Empty,
                    } );
                }
                retorno.error = false;
                retorno.response = lista;
            }
            catch ( Exception ex ) {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }

        public Response<List<E_HojaRutacontrol>> ListarPaginado( Request<E_HojaRutacontrol> entidad ) {
            throw new NotImplementedException();
        }

        public Response<List<E_Transportista>> ListarTransportista( Request<E_HojaRutacontrol> entidad ) {
            Response<List<E_Transportista>> retorno = new Response<List<E_Transportista>>();

            try {
                DataTable dt = HojaRutaControlRepositorio.ListarTransportista( entidad.entidad );
                List<E_Transportista> lista = new List<E_Transportista>();

                foreach ( DataRow row in dt.Rows ) {
                    lista.Add( new E_Transportista() {
                        TraDDes = row["TraDDes"] != DBNull.Value ? row["TraDDes"].ToString() : string.Empty,
                        TraCCod = row["TraCCod"] != DBNull.Value ? row["TraCCod"].ToString() : string.Empty,
                        TotalPage = Convert.ToInt32( row["TotalRecords"].ToString() ),
                    } );
                }
                retorno.error = false;
                retorno.response = lista;
            }
            catch ( Exception ex ) {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }
        public Response<List<E_HojaRutaControlDetalle>> Listar_HojaRutaControlDetalle( Request<E_HojaRutacontrol> entidad ) {
            Response<List<E_HojaRutaControlDetalle>> retorno = new Response<List<E_HojaRutaControlDetalle>>();

            try {
                DataTable dt = HojaRutaControlRepositorio.Listar_HojaRutaControlDetalle( entidad.entidad );
                List<E_HojaRutaControlDetalle> lista = new List<E_HojaRutaControlDetalle>();

                foreach ( DataRow row in dt.Rows ) {
                    lista.Add( new E_HojaRutaControlDetalle() {
                        HRCDID = Convert.ToInt32( row["HRCDID"].ToString() ),
                        HRCDDestino = row["HRCDDestino"] != DBNull.Value ? row["HRCDDestino"].ToString() : string.Empty,
                        HRCDZona = row["HRCDZona"] != DBNull.Value ? row["HRCDZona"].ToString() : string.Empty,
                        HRCDProducto = row["HRCDProducto"] != DBNull.Value ? row["HRCDProducto"].ToString() : string.Empty,
                        HRCDPesoIng = row["HRCDPesoIng"].ToString() == string.Empty ? (decimal?)null : Convert.ToDecimal( row["HRCDPesoIng"].ToString() ),
                        HRCDPesoRet = row["HRCDPesoRet"].ToString() == string.Empty ? (decimal?)null : Convert.ToDecimal( row["HRCDPesoRet"].ToString() ),
                        HRCDHoraLlegada = row["HRCDHoraLlegada"] != DBNull.Value ? row["HRCDHoraLlegada"].ToString() : string.Empty,
                        HRCDHoraSalida = row["HRCDHoraSalida"] != DBNull.Value ? row["HRCDHoraSalida"].ToString() : string.Empty,
                        HRCDKilometraje = row["HRCDKilometraje"].ToString() == string.Empty ? (decimal?)null : Convert.ToDecimal( row["HRCDKilometraje"].ToString() ),
                        HRCDArea = row["HRCDArea"] != DBNull.Value ? row["HRCDArea"].ToString() : string.Empty,
                        HRCDObservacion = row["HRCDObservacion"] != DBNull.Value ? row["HRCDObservacion"].ToString() : string.Empty,

                    } );
                }
                retorno.error = false;
                retorno.response = lista;
            }
            catch ( Exception ex ) {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }
    }
}
