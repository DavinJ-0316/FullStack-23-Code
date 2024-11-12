using System.Collections;

namespace GenericCollectionAttribute.Collection
{
		public class CustomColleciton : IEnumerable //约束 contract
		{      
        public IEnumerator GetEnumerator()
        {
            throw new NotImplementedException();
        }

        public void Method() { }
    }

		public class KFCMenuIterator : IIterator<Food>
    {
        private Food[] foods = null;

        //
        public void Method()
        {
						CustomColleciton customColleciton = new CustomColleciton();
            foreach(var s in customColleciton)
            {

            }
				}
        public KFCMenuIterator(KFCMenu kFCMenu)
        {
            foods = kFCMenu.GetFoods();
        }

        private int _currentIndex = -1;

        public Food Current
        {
            get
            {
                return foods[_currentIndex];
            }
        }

        public bool MoveNext()
        {
            return foods.Length > ++_currentIndex;
        }

        public void Reset()
        {
            _currentIndex = -1;
        }
    }

    public class MacdonalMenuIterator : IIterator<Food>
    {
        private List<Food> foods = new List<Food>();
        private int _currentIndex = -1;

        public MacdonalMenuIterator(MacDonaldMenu macDonaldMenu)
        {
            foods = macDonaldMenu.GetFoods();
        }

        public Food Current
        {
            get
            {
                return foods[_currentIndex];
            }
        }

        public bool MoveNext()
        {
            return foods.Count > ++_currentIndex;
        }

        public void Reset()
        {
            _currentIndex = -1;
        }
    }
}
