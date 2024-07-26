import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit {
  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngAfterViewInit(): void {
    const minimizeButton = this.el.nativeElement.querySelector('[data-bs-toggle="minimize"]');
    const offcanvasButton = this.el.nativeElement.querySelector('[data-bs-toggle="offcanvas"]');
    const body = this.el.nativeElement.ownerDocument.body;
    const sidebar = this.el.nativeElement.ownerDocument.getElementById('sidebar');

    // Event listener for the minimize button
    this.renderer.listen(minimizeButton, 'click', () => {
      if (body.classList.contains('sidebar-toggle-display') || body.classList.contains('sidebar-absolute')) {
        this.toggleClass(body, 'sidebar-hidden');
      } else {
        this.toggleClass(body, 'sidebar-icon-only');
      }
    });

    // Event listener for the offcanvas button
    this.renderer.listen(offcanvasButton, 'click', () => {
      this.toggleClass(sidebar, 'active');
    });
  }

  private toggleClass(element: any, className: string): void {
    if (element.classList.contains(className)) {
      this.renderer.removeClass(element, className);
    } else {
      this.renderer.addClass(element, className);
    }
  }
}
