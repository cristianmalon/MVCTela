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
    public class CDSD01Aplicacion : IGeneralAplicacion<E_CDSD01>
    {
        private CDSD01Repositorio CDSD01Repositorio;
        public CDSD01Aplicacion( CDSD01Repositorio CDSD01Repositorio ) {
            this.CDSD01Repositorio = CDSD01Repositorio;
        }

        public Response Actualizar( Request<E_CDSD01> entidad ) {
            throw new NotImplementedException();
        }

        public Response Eliminar( Request<E_CDSD01> entidad ) {
            throw new NotImplementedException();
        }

        public Response Insertar( Request<E_CDSD01> entidad ) {
            Response retorno = new Response();
            try {
                var resultado = CDSD01Repositorio.Insertar( entidad.entidad );
                retorno.Success = true;
            }
            catch ( Exception ex ) {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;

        }

        public Response Generar_Despacho_Placa( Request<E_CDSD01> entidad ) {
            Response retorno = new Response();
            try {
                var resultado = CDSD01Repositorio.Generar_Despacho_Placa( entidad.entidad );
                retorno.Success = true;
            }
            catch ( Exception ex ) {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;

        }

        public Response InsertarDestino( Request<E_CDSD01> entidad ) {
            Response retorno = new Response();
            try {
                var resultado = CDSD01Repositorio.InsertarDestino( entidad.entidad );
                retorno.Success = true;
            }
            catch ( Exception ex ) {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;

        }

        public Response ListarPlaca( Request<E_CDSD01> entidad ) {
            Response retorno = new Response();
            try {
                var resultado = CDSD01Repositorio.ListarPlaca( entidad.entidad );
                retorno.Success = true;
                retorno.output = resultado["Placa"].ToString();
            }
            catch ( Exception ex ) {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;

        }

        public Response<List<E_CDSD01>> Listar( Request<E_CDSD01> entidad ) {
            Response<List<E_CDSD01>> retorno = new Response<List<E_CDSD01>>();

            try {
                DataTable dt = CDSD01Repositorio.Listar( entidad.entidad );
                List<E_CDSD01> lista = new List<E_CDSD01>();

                foreach ( DataRow row in dt.Rows ) {
                    lista.Add( new E_CDSD01() {
                        EmpCCod = row["EmpCCod"] != DBNull.Value ? row["EmpCCod"].ToString() : string.Empty,
                        Anio = Convert.ToInt32( row["LGRNANO"].ToString() ),
                        IDCaptura = Convert.ToInt32( row["LGRNNRO"].ToString() ),
                        CdsCProv = row["proveedor"] != DBNull.Value ? row["proveedor"].ToString() : string.Empty,
                        LGRCOCOsvCNume = row["LGRCOCOsvCNume"] != DBNull.Value ? row["LGRCOCOsvCNume"].ToString() : string.Empty,
                        DGRNITM = row["DGRNITM"] != DBNull.Value ? row["DGRNITM"].ToString() : string.Empty,
                        GuiDTrans = row["GuiDTrans"] != DBNull.Value ? row["GuiDTrans"].ToString() : string.Empty,
                        GuiDPtoDes = row["GuiDPtoDes"] != DBNull.Value ? row["GuiDPtoDes"].ToString() : string.Empty,
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

        public Response<List<E_CDSD01>> ListarAyuda( Request<E_CDSD01> entidad ) {
            Response<List<E_CDSD01>> retorno = new Response<List<E_CDSD01>>();

            try {
                DataTable dt = CDSD01Repositorio.ListarAyuda( entidad.entidad );
                List<E_CDSD01> lista = new List<E_CDSD01>();

                foreach ( DataRow row in dt.Rows ) {
                    lista.Add( new E_CDSD01() {
                        //EmpCCod = row["EmpCCod"] != DBNull.Value ? row["EmpCCod"].ToString() : string.Empty,
                        //Anio = Convert.ToInt32( row["LGRNANO"].ToString() ),
                        //IDCaptura = Convert.ToInt32( row["LGRNNRO"].ToString() ),
                        //CdsCProv = row["proveedor"] != DBNull.Value ? row["proveedor"].ToString() : string.Empty,
                        //LGRCOCOsvCNume = row["LGRCOCOsvCNume"] != DBNull.Value ? row["LGRCOCOsvCNume"].ToString() : string.Empty,
                        //DGRNITM = row["DGRNITM"] != DBNull.Value ? row["DGRNITM"].ToString() : string.Empty,
                        //GuiDTrans = row["GuiDTrans"] != DBNull.Value ? row["GuiDTrans"].ToString() : string.Empty,
                        //GuiDPtoDes = row["GuiDPtoDes"] != DBNull.Value ? row["GuiDPtoDes"].ToString() : string.Empty,
                        //Placa = row["DGRDPLACA"] != DBNull.Value ? row["DGRDPLACA"].ToString() : string.Empty,
                        DGRNANO = row["DGRNANO"] != DBNull.Value ? row["DGRNANO"].ToString() : string.Empty,
                        DGRNNRO = row["DGRNNRO"] != DBNull.Value ? row["DGRNNRO"].ToString() : string.Empty,
                        LGRCPROVEEDOR = row["LGRCPROVEEDOR"] != DBNull.Value ? row["LGRCPROVEEDOR"].ToString() : string.Empty,
                        LGRDPROVEEDOR = row["LGRDPROVEEDOR"] != DBNull.Value ? row["LGRDPROVEEDOR"].ToString() : string.Empty,
                        Bultos = row["Bultos"] != DBNull.Value ? row["Bultos"].ToString() : string.Empty,
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

        public Response<List<E_CDSD01>> ListarDestino( Request<E_CDSD01> entidad ) {
            Response<List<E_CDSD01>> retorno = new Response<List<E_CDSD01>>();

            try {
                DataTable dt = CDSD01Repositorio.ListarDestino( entidad.entidad );
                List<E_CDSD01> lista = new List<E_CDSD01>();

                foreach ( DataRow row in dt.Rows ) {
                    lista.Add( new E_CDSD01() {
                        EmpCCod = row["EmpCCod"] != DBNull.Value ? row["EmpCCod"].ToString() : string.Empty,
                        Anio = Convert.ToInt32( row["LGRNANO"].ToString() ),
                        IDCaptura = Convert.ToInt32( row["LGRNNRO"].ToString() ),
                        CdsCProv = row["proveedor"] != DBNull.Value ? row["proveedor"].ToString() : string.Empty,
                        LGRCOCOsvCNume = row["LGRCOCOsvCNume"] != DBNull.Value ? row["LGRCOCOsvCNume"].ToString() : string.Empty,
                        DGRNITM = row["DGRNITM"] != DBNull.Value ? row["DGRNITM"].ToString() : string.Empty,
                        GuiDTrans = row["GuiDTrans"] != DBNull.Value ? row["GuiDTrans"].ToString() : string.Empty,
                        GuiDPtoDes = row["GuiDPtoDes"] != DBNull.Value ? row["GuiDPtoDes"].ToString() : string.Empty,
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

        public Response<List<E_CDSD01>> ListarAyudadestino( Request<E_CDSD01> entidad ) {
            Response<List<E_CDSD01>> retorno = new Response<List<E_CDSD01>>();

            try {
                DataTable dt = CDSD01Repositorio.ListarAyudadestino( entidad.entidad );
                List<E_CDSD01> lista = new List<E_CDSD01>();

                foreach ( DataRow row in dt.Rows ) {
                    lista.Add( new E_CDSD01() {
                        //EmpCCod = row["EmpCCod"] != DBNull.Value ? row["EmpCCod"].ToString() : string.Empty,
                        //Anio = Convert.ToInt32( row["LGRNANO"].ToString() ),
                        //IDCaptura = Convert.ToInt32( row["LGRNNRO"].ToString() ),
                        //CdsCProv = row["proveedor"] != DBNull.Value ? row["proveedor"].ToString() : string.Empty,
                        //LGRCOCOsvCNume = row["LGRCOCOsvCNume"] != DBNull.Value ? row["LGRCOCOsvCNume"].ToString() : string.Empty,
                        //DGRNITM = row["DGRNITM"] != DBNull.Value ? row["DGRNITM"].ToString() : string.Empty,
                        //GuiDTrans = row["GuiDTrans"] != DBNull.Value ? row["GuiDTrans"].ToString() : string.Empty,
                        //GuiDPtoDes = row["GuiDPtoDes"] != DBNull.Value ? row["GuiDPtoDes"].ToString() : string.Empty,
                        //Placa = row["DGRDPLACA"] != DBNull.Value ? row["DGRDPLACA"].ToString() : string.Empty,
                        DGRNANO = row["DGRNANO"] != DBNull.Value ? row["DGRNANO"].ToString() : string.Empty,
                        DGRNNRO = row["DGRNNRO"] != DBNull.Value ? row["DGRNNRO"].ToString() : string.Empty,
                        LGRCPROVEEDOR = row["LGRCPROVEEDOR"] != DBNull.Value ? row["LGRCPROVEEDOR"].ToString() : string.Empty,
                        LGRDPROVEEDOR = row["LGRDPROVEEDOR"] != DBNull.Value ? row["LGRDPROVEEDOR"].ToString() : string.Empty,
                        Bultos = row["Bultos"] != DBNull.Value ? row["Bultos"].ToString() : string.Empty,
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
        public Response<List<E_CDSD02>> ListarDetalle( Request<E_CDSD01> entidad ) {

            Response<List<E_CDSD02>> retorno = new Response<List<E_CDSD02>>();

            try {
                DataTable dt = CDSD01Repositorio.ListarDetalle( entidad.entidad );
                List<E_CDSD02> lista = new List<E_CDSD02>();

                foreach ( DataRow row in dt.Rows ) {
                    lista.Add( new E_CDSD02() {
                        EmpCCod = row["EmpCCod"] != DBNull.Value ? row["EmpCCod"].ToString() : string.Empty,
                        Anio = Convert.ToInt32( row["LGRNANO"].ToString() ),
                        IDCaptura = Convert.ToInt32( row["LGRNNRO"].ToString() ),
                        LGRNIBOLSA = Convert.ToInt32( row["LGRNIBOLSA"].ToString() ),
                        LGRDIBOLSA = row["LGRDIBOLSA"] != DBNull.Value ? row["LGRDIBOLSA"].ToString() : string.Empty,
                        LGRSLECTURA = row["LGRSLECTURA"] != DBNull.Value ? row["LGRSLECTURA"].ToString() : string.Empty,
                        CodBarra = row["CodBarra"] != DBNull.Value ? row["CodBarra"].ToString() : string.Empty,
                        CodBarra1 = row["CodBarra1"] != DBNull.Value ? row["CodBarra1"].ToString() : string.Empty,
                        color = row["color"] != DBNull.Value ? row["color"].ToString() : string.Empty,
                        CantidadPrendas = row["CantidadPrendas"] != DBNull.Value ? row["CantidadPrendas"].ToString() : string.Empty,
                        OFCorte = row["OFCorte"] != DBNull.Value ? row["OFCorte"].ToString() : string.Empty,
                        Pedido = row["Pedido"] != DBNull.Value ? row["Pedido"].ToString() : string.Empty,
                        LGRCOCOsvCNume = row["LGRCOCOsvCNume"] != DBNull.Value ? row["LGRCOCOsvCNume"].ToString() : string.Empty,
                        CdsSLectura = row["CdsSLectura"] != DBNull.Value ? row["CdsSLectura"].ToString() : string.Empty,
                        LGRGuicNume = row["LGRGuicNume"] != DBNull.Value ? row["LGRGuicNume"].ToString() : string.Empty,
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

        public Response<List<E_CDSD02>> ListarDetalleDestino( Request<E_CDSD01> entidad ) {

            Response<List<E_CDSD02>> retorno = new Response<List<E_CDSD02>>();

            try {
                DataTable dt = CDSD01Repositorio.ListarDetalleDestino( entidad.entidad );
                List<E_CDSD02> lista = new List<E_CDSD02>();

                foreach ( DataRow row in dt.Rows ) {
                    lista.Add( new E_CDSD02() {
                        EmpCCod = row["EmpCCod"] != DBNull.Value ? row["EmpCCod"].ToString() : string.Empty,
                        Anio = Convert.ToInt32( row["LGRNANO"].ToString() ),
                        IDCaptura = Convert.ToInt32( row["LGRNNRO"].ToString() ),
                        LGRNIBOLSA = Convert.ToInt32( row["LGRNIBOLSA"].ToString() ),
                        LGRDIBOLSA = row["LGRDIBOLSA"] != DBNull.Value ? row["LGRDIBOLSA"].ToString() : string.Empty,
                        LGRSLECEnt = row["LGRSLECEnt"] != DBNull.Value ? row["LGRSLECEnt"].ToString() : string.Empty,
                        CodBarra = row["CodBarra"] != DBNull.Value ? row["CodBarra"].ToString() : string.Empty,
                        CodBarra1 = row["CodBarra1"] != DBNull.Value ? row["CodBarra1"].ToString() : string.Empty,
                        color = row["color"] != DBNull.Value ? row["color"].ToString() : string.Empty,
                        CantidadPrendas = row["CantidadPrendas"] != DBNull.Value ? row["CantidadPrendas"].ToString() : string.Empty,
                        OFCorte = row["OFCorte"] != DBNull.Value ? row["OFCorte"].ToString() : string.Empty,
                        Pedido = row["Pedido"] != DBNull.Value ? row["Pedido"].ToString() : string.Empty,
                        LGRCOCOsvCNume = row["LGRCOCOsvCNume"] != DBNull.Value ? row["LGRCOCOsvCNume"].ToString() : string.Empty,
                        CdsSLectura = row["CdsSLectura"] != DBNull.Value ? row["CdsSLectura"].ToString() : string.Empty,
                        LGRGuicNume = row["LGRGuicNume"] != DBNull.Value ? row["LGRGuicNume"].ToString() : string.Empty,
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

        public Response<List<E_CDSD01>> ListarPaginado( Request<E_CDSD01> entidad ) {

            Response<List<E_CDSD01>> retorno = new Response<List<E_CDSD01>>();

            try {
                DataTable dt = CDSD01Repositorio.ListarPaginado( entidad.entidad );
                List<E_CDSD01> lista = new List<E_CDSD01>();

                foreach ( DataRow row in dt.Rows ) {
                    lista.Add( new E_CDSD01() {
                        EmpCCod = row["EmpCCod"] != DBNull.Value ? row["EmpCCod"].ToString() : string.Empty,
                        Anio = Convert.ToInt32( row["Anio"].ToString() ),
                        IDCaptura = Convert.ToInt32( row["IDCaptura"].ToString() ),


                        CdsNSerieGuia = row["CdsNSerieGuia"] != DBNull.Value ? row["CdsNSerieGuia"].ToString() : string.Empty,
                        CdsNGuia = row["CdsNGuia"] != DBNull.Value ? row["CdsNGuia"].ToString() : string.Empty,
                        CdsCProv = row["CdsCProv"] != DBNull.Value ? row["CdsCProv"].ToString() : string.Empty,
                        CdsCTSer = row["CdsCTSer"] != DBNull.Value ? row["CdsCTSer"].ToString() : string.Empty,
                        CdsNASer = row["CdsNASer"] != DBNull.Value ? row["CdsNASer"].ToString() : string.Empty,

                        SerialKey = CShrapEncryption.EncryptString( row["EmpCCod"].ToString().Trim() + "#" + row["Anio"].ToString().Trim() + "#" + row["IDCaptura"].ToString().Trim(), entidad.token ),
                        TotalPage = Convert.ToInt32( row["TotalRecords"].ToString() ),

                    });
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

        public Response<List<E_CDSD01>> Listar_Reporte_Despacho( Request<E_CDSD01> entidad ) {

            Response<List<E_CDSD01>> retorno = new Response<List<E_CDSD01>>();

            try {
                DataTable dt = CDSD01Repositorio.Listar_Reporte_Despacho( entidad.entidad );
                List<E_CDSD01> lista = new List<E_CDSD01>();

                foreach ( DataRow row in dt.Rows ) {
                    lista.Add( new E_CDSD01() {
                        LGRCPROVEEDOR = row["LGRCPROVEEDOR"] != DBNull.Value ? row["LGRCPROVEEDOR"].ToString() : string.Empty,
                        LGRDPROVEEDOR = row["LGRDPROVEEDOR"] != DBNull.Value ? row["LGRDPROVEEDOR"].ToString() : string.Empty,
                        LGRFFECEMI = row["LGRFFECEMI"].ToString() == string.Empty ? (DateTime?)null : Convert.ToDateTime( row["LGRFFECEMI"].ToString() ),
                        Placa = row["DGRDPLACA"] != DBNull.Value ? row["DGRDPLACA"].ToString() : string.Empty,
                        DGRNANO = row["DGRNANO"] != DBNull.Value ? row["DGRNANO"].ToString() : string.Empty,
                        DGRNNRO = row["DGRNNRO"] != DBNull.Value ? row["DGRNNRO"].ToString() : string.Empty,
                        Bultos = row["Bultos"] != DBNull.Value ? row["Bultos"].ToString() : string.Empty,
                        FechaInicio = row["Inicio"].ToString() == string.Empty ? (DateTime?)null : Convert.ToDateTime( row["Inicio"].ToString() ),
                        FechaFin = row["Fin"].ToString() == string.Empty ? (DateTime?)null : Convert.ToDateTime( row["Fin"].ToString() ),
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
