document.documentElement.classList.add('js');

// 책등을 누르면 그 책의 기록을 보여 준다
const books = [
  {
    title: '견뎌야 하는 단어들에 대하여',
    pub: '지식인하우스 · 2017년 6월 25일',
    record: '교보문고 종합 베스트셀러 2위. 히가시노 게이고와 무라카미 하루키 사이에 올랐고, MBC 「나 혼자 산다」에서 사이먼 도미닉이 좋아하는 책으로 낭독했습니다.'
  },
  {
    title: '우리를 아끼기로 합니다',
    pub: '카멜북스 · 2018년 7월 23일',
    record: '교보문고 에세이 베스트셀러. 돌아봐도 후회 없게 매 순간을 눌러 담은 에세이입니다.'
  },
  {
    title: '한참을 울어도 몸무게는 그대로',
    pub: '카멜북스 · 2020년 1월 13일',
    record: '교보문고 에세이 베스트셀러.'
  },
  {
    title: '초보인간',
    pub: '지식인하우스 · 2022년 11월 30일',
    record: '교보문고 에세이 베스트셀러. 생의 모든 순간이 처음인 우리에게 건네는 위로의 문장들입니다.'
  },
  {
    title: '베스트셀러 사회',
    pub: '도서출판 박영사 · 2027년 출간 예정',
    record: '다섯 번째 책으로, 2027년 출간을 준비하고 있습니다.'
  }
];

const card = document.querySelector('.book-card');
const spines = document.querySelectorAll('.spine');
spines.forEach((spine) => {
  spine.addEventListener('click', () => {
    const b = books[Number(spine.dataset.book)];
    spines.forEach((s) => s.setAttribute('aria-pressed', String(s === spine)));
    card.querySelector('.book-title').textContent = b.title;
    card.querySelector('.book-pub').textContent = b.pub;
    card.querySelector('.book-record').textContent = b.record;
    card.classList.remove('swap');
    void card.offsetWidth;
    card.classList.add('swap');
  });
});

// 섹션이 보이면 제목, 글, 사진 순서로 올라온다
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const seen = new WeakMap();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const parent = e.target.closest('section, footer') || document.body;
      const n = seen.get(parent) || 0;
      seen.set(parent, n + 1);
      e.target.style.setProperty('--d', Math.min(n, 6) * 80 + 'ms');
      e.target.classList.add('in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('in'));
}
