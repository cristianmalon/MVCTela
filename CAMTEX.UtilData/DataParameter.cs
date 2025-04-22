using System;

namespace CAMTEX.UtilData
{
    public class ListDataParameter
    {
    }
    public class DataParameter<T>
    {
        public String parametro { get; set; }
        public T valor { get; set; }

        public DataParameter(String parametro, T valor)
        {
            this.parametro = parametro;
            this.valor = valor;
        }
    }
}
