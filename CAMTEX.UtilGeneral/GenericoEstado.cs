using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CAMTEX.Entidades;
namespace CAMTEX.UtilGeneral
{
    public class GenericoEstado
    {
        public static List<Entidades.EntidadEstado> GeneralEstado()
        {
            List<Entidades.EntidadEstado> ListaEstados;

            ListaEstados = new List<Entidades.EntidadEstado>();
            ListaEstados.Add(new Entidades.EntidadEstado("A", "ACTIVO"));
            ListaEstados.Add(new Entidades.EntidadEstado("I", "INACTIVO"));
            return ListaEstados;
        }
    }
}
