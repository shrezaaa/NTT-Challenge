import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ArticleDetailComponent } from './article-detail.component';
import { ArticleService } from '../../services/article.service';
import { Article, ArticleComment } from '../../types/article.type';
import { ActivatedRoute } from '@angular/router';

// Mock data
const mockArticle: Article = {
  slug: 'test-article',
  title: 'Test Article',
  description: 'A test description',
  body: 'Full article body here',
  tagList: ['angular', 'unit-testing'],
  createdAt: '',
  updatedAt: '',
  favorited: false,
  favoritesCount: 3,
  author: { username: 'user1', bio: '', image: '', following: false },
};

const mockComments: ArticleComment[] = [
  {
    id: '1',
    body: 'Great post!',
    createdAt: '',
    updatedAt: '',
    author: { username: 'commenter', bio: '', image: '', following: false },
  },
  {
    id: '2',
    body: 'Thanks for sharing.',
    createdAt: '',
    updatedAt: '',
    author: { username: 'reader', bio: '', image: '', following: false },
  },
];

// Mock ArticleService
class MockArticleService {
  getArticleDetail(slug: string) {
    return of({ article: mockArticle });
  }
  getArticleComments(slug: string) {
    return of({ comments: mockComments });
  }
}

describe('ArticleDetailComponent', () => {
  let component: ArticleDetailComponent;
  let fixture: ComponentFixture<ArticleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleDetailComponent],
      providers: [
        { provide: ArticleService, useClass: MockArticleService },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { slug: 'test-article' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load article detail on init', (done) => {
    component.article$.subscribe((res) => {
      expect(res.article.slug).toBe('test-article');
      expect(res.article.title).toBe('Test Article');
      done();
    });
  });

  it('should load comments on init', (done) => {
    component.comments$.subscribe((res) => {
      expect(res.comments.length).toBe(2);
      expect(res.comments[0].body).toBe('Great post!');
      done();
    });
  });

  it('should render article title and comments in template', () => {
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('mat-card-title'));
    expect(title.nativeElement.textContent).toContain('Test Article');

    const commentBodies = fixture.debugElement.queryAll(By.css('p'));
    const textContent = commentBodies.map((el) => el.nativeElement.textContent);

    expect(textContent).toContain('Great post!');
    expect(textContent).toContain('Thanks for sharing.');
  });
});
