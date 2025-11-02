import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements AfterViewInit, OnDestroy {

  @ViewChild('sliderWrapper', { static: true }) sliderWrapper!: ElementRef;

  images: string[] = [
    'assets/pic1.jpg',
    'assets/pic2.jpg',
    'assets/pic3.jpg',
    'assets/pic4.jpg',
    'assets/pic5.jpg',
    'assets/pic6.jpg',
    'assets/pic7.jpg',
    'assets/pic8.jpg',
    'assets/pic9.jpg'
  ];

  currentSlide = 0;
  slides!: HTMLElement[];
  dots!: HTMLElement[];
  private intervalId: any;
  private autoSlideInterval = 5000; // 5 Sekunden

  isVideoOpen = false;

  ngAfterViewInit(): void {
    this.slides = Array.from(this.sliderWrapper.nativeElement.querySelectorAll('.slider-slide'));
    this.dots = Array.from(this.sliderWrapper.nativeElement.querySelectorAll('.dot'));

    this.showSlide(this.currentSlide);
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  // ================= Slider Navigation =================
  prev(): void {
    this.showSlide(this.currentSlide - 1);
    this.restartAutoSlide();
  }

  next(): void {
    this.showSlide(this.currentSlide + 1);
    this.restartAutoSlide();
  }

  goTo(index: number): void {
    this.showSlide(index);
    this.restartAutoSlide();
  }

  private showSlide(index: number): void {
    const total = this.images.length;

    if (index >= total) this.currentSlide = 0;
    else if (index < 0) this.currentSlide = total - 1;
    else this.currentSlide = index;

    this.slides.forEach((slide, i) => slide.classList.toggle('active', i === this.currentSlide));
    this.dots.forEach((dot, i) => dot.classList.toggle('active', i === this.currentSlide));
  }

  // ================= Auto-Slider =================
  private startAutoSlide(): void {
    this.stopAutoSlide();
    this.intervalId = setInterval(() => this.showSlide(this.currentSlide + 1), this.autoSlideInterval);
  }

  private stopAutoSlide(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private restartAutoSlide(): void {
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  // ================= Video Modal =================
  openVideoModal(): void {
    this.isVideoOpen = true;
    this.stopAutoSlide();
  }

  closeVideoModal(): void {
    const video = document.querySelector('.event-video') as HTMLVideoElement | null;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    this.isVideoOpen = false;
    this.startAutoSlide();
  }
}
