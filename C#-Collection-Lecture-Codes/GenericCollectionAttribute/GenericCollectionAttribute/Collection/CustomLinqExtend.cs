using System.Collections;

namespace GenericCollectionAttribute.Collection
{
    public static class CustomLinqExtend
    {
        public static IEnumerable<T> CustomWhere<T>(this IEnumerable<T> source, Func<T, bool> predicate)
        {
            if(source == null)
            {
                throw new ArgumentNullException("source");
            }

            if(predicate == null)
            {
                throw new ArgumentNullException("predicate");
            }

            return new EnumeratorIterator<T>(source, predicate);

            #region - 常规的遍历返回满足条件的值
            List<T> result = new List<T>();
            foreach (T item in source) 
            {
                if (predicate(item))
                {
                    result.Add(item);
                }
            }

            return result;
            #endregion
        }
    }

    public class EnumeratorIterator<T> : IEnumerable<T> 
    {
        private readonly IEnumerable<T> _source;
        private Func<T, bool> _predicate;

        public EnumeratorIterator(IEnumerable<T> source, Func<T, bool> predicate)
        {
            _source = source;
            _predicate = predicate;
        }

        public IEnumerator<T> GetEnumerator()
        {
            foreach (var item in _source)
            {
                if (_predicate(item))
                {
                    yield return item;
                }
            }
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            foreach (var item in _source)
            {
                if (_predicate(item))
                {
                    yield return item;
                }
            }
        }
    }
}
