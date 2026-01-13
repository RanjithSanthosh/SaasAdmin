import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-comp',
  imports: [],
  templateUrl: './landing-comp.component.html',
  styleUrl: './landing-comp.component.css' // Note: correct property is styleUrls but styleUrl is allowed in newer Angular versions or if single string
})
export class LandingCompComponent {

  constructor(private router: Router) { }

  createNew() {
    this.router.navigate(['dashboard/new-client']);
  }
}
