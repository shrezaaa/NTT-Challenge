import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ArticlesListComponent } from './articles-list.component';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../types/article.type';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

// Mock data
const mockArticles: Article[] = [
  {
    slug: 'test-1',
    title: 'Test Article 1',
    description: 'desc',
    body: 'body',
    tagList: ['angular', 'testing'],
    createdAt: '',
    updatedAt: '',
    favorited: false,
    favoritesCount: 0,
    author: { username: 'user1', bio: '', image: '', following: false },
  },
  {
    slug: 'test-2',
    title: 'Test Article 2',
    description: 'desc2',
    body: 'body2',
    tagList: [],
    createdAt: '',
    updatedAt: '',
    favorited: false,
    favoritesCount: 5,
    author: { username: 'user2', bio: '', image: '', following: false },
  },
];

// Mock service
class MockArticleService {
  getArticleList() {
    return of({ articles: mockArticles });
  }
}

describe('ArticlesListComponent', () => {
  let component: ArticlesListComponent;
  let fixture: ComponentFixture<ArticlesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesListComponent, RouterTestingModule],
      providers: [{ provide: ArticleService, useClass: MockArticleService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticlesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load articles on init', (done) => {
    component.articles$.subscribe((res: { articles: Article[] }) => {
      expect(res.articles.length).toBe(2);
      expect(res.articles[0].title).toBe('Test Article 1');
      done();
    });
  });

  it('should render article titles in the template', () => {
    fixture.detectChanges();

    const titles = fixture.debugElement.queryAll(By.css('mat-card-title'));
    expect(titles.length).toBe(2);
    expect(titles[0].nativeElement.textContent).toContain('Test Article 1');
    expect(titles[1].nativeElement.textContent).toContain('Test Article 2');
  });
});
