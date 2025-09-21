import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ArticleService } from './article.service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { environment } from 'apps/challenge-app/src/environments/environment';
import { Article, ArticleComment } from '../types/article.type';

describe('ArticleService', () => {
  let service: ArticleService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticleService],
    });

    service = TestBed.inject(ArticleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // ensure no outstanding requests
  });

  it('should fetch article list', () => {
    const mockArticles: Article[] = [
      {
        slug: 'test-1',
        title: 'Test Article 1',
        description: 'desc',
        body: 'body',
        tagList: [],
        createdAt: '',
        updatedAt: '',
        favorited: false,
        favoritesCount: 0,
        author: { username: 'user1', bio: '', image: '', following: false },
      },
    ];

    service.getArticleList().subscribe((res) => {
      expect(res.articles.length).toBe(1);
      expect(res.articles[0].title).toBe('Test Article 1');
    });

    const req = httpMock.expectOne(`${apiUrl}/articles`);
    expect(req.request.method).toBe('GET');
    req.flush({ articles: mockArticles });
  });

  it('should fetch article detail', () => {
    const slug = 'test-1';
    const mockArticle: Article = {
      slug,
      title: 'Test Article 1',
      description: 'desc',
      body: 'body',
      tagList: [],
      createdAt: '',
      updatedAt: '',
      favorited: false,
      favoritesCount: 0,
      author: { username: 'user1', bio: '', image: '', following: false },
    };

    service.getArticleDetail(slug).subscribe((res) => {
      expect(res.article.slug).toBe(slug);
      expect(res.article.title).toBe('Test Article 1');
    });

    const req = httpMock.expectOne(`${apiUrl}/articles/${slug}`);
    expect(req.request.method).toBe('GET');
    req.flush({ article: mockArticle });
  });

  it('should fetch article comments', () => {
    const slug = 'test-1';
    const mockComments: ArticleComment[] = [
      {
        id: '1',
        body: 'Nice article!',
        createdAt: '',
        updatedAt: '',
        author: { username: 'commenter', bio: '', image: '', following: false },
      },
    ];

    service.getArticleComments(slug).subscribe((res) => {
      expect(res.comments.length).toBe(1);
      expect(res.comments[0].body).toBe('Nice article!');
    });

    const req = httpMock.expectOne(`${apiUrl}/articles/${slug}/comments`);
    expect(req.request.method).toBe('GET');
    req.flush({ comments: mockComments });
  });
});
